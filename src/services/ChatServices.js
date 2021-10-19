import * as UserRepository from "../repositories/UserRepository";
import * as ChatMessageRepository from "../repositories/ChatMessageRepository";
import resFormat from "../utils/resFormat";
//잡담방 채팅 로그
export const GetMainChatLog = async (req, res, next) => {
    try {
        let lastId = parseInt(req.query.lastId, 10);
        if (req.query.lastId === "null") {
            lastId = null;
        } else {
            const findLastId =
                await ChatMessageRepository.findChanelMainChatLastId(
                    parseInt(req.params.channelId),
                    lastId
                );
            if (!findLastId[0]) {
                return res
                    .status(200)
                    .send(
                        resFormat.successData(200, "마지막 채팅입니다", null)
                    );
            }
            lastId = findLastId[0].id;
        }
        const response = await ChatMessageRepository.findChatByChannelId(
            parseInt(req.params.channelId),
            lastId,
            parseInt(req.query.limit, 10)
        );
        if (!response[0]) {
            return res
                .status(200)
                .send(resFormat.successData(200, "채널 채팅이 없습니다.", []));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};
//잡담방 채팅 보내기
export const MainChat = async (req, res, next) => {
    try {
        const joinUser = await UserRepository.CheckJoinChannel(
            req.user.id,
            parseInt(req.params.channelId)
        );
        if (!joinUser[0]) {
            return res
                .status(401)
                .send(
                    resFormat.fail(401, "참여한 채널에만 채팅이 가능합니다.")
                );
        }

        const response = await ChatMessageRepository.createChannelMainChat(
            req.user.id,
            parseInt(req.params.channelId),
            req.body.content
        );

        if (!response) {
            return res.status(400).send(resFormat.fail(400, "실패"));
        }
        const io = req.app.get("io");
        io.of(`/channel-${req.params.channelId}`).emit("message", response);

        return res
            .status(200)
            .send(resFormat.successData(200, "성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

//룸 채팅 로그
export const GetRoomChatLog = async (req, res, next) => {
    try {
        let lastId = parseInt(req.query.lastId, 10);
        if (req.query.lastId === "null") {
            lastId = null;
        } else {
            const findLastId = await ChatMessageRepository.findRoomChatLastId(
                parseInt(req.params.roomId),
                lastId
            );
            if (!findLastId[0]) {
                return res
                    .status(200)
                    .send(
                        resFormat.successData(200, "마지막 채팅입니다.", null)
                    );
            }
            lastId = findLastId[0].id;
        }
        const response = await ChatMessageRepository.findChatByRoomId(
            parseInt(req.params.roomId),
            lastId,
            parseInt(req.query.limit, 10)
        );
        if (!response[0]) {
            return res
                .status(200)
                .send(resFormat.successData(200, "채팅방 채팅이 없습니다", []));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

//룸 채팅 보내기
export const RoomChat = async (req, res, next) => {
    try {
        const response = await ChatMessageRepository.createRoomChat(
            req.user.id,
            parseInt(req.params.roomId),
            req.body.content
        );

        if (!response) {
            return res.status(400).send(resFormat.fail(400, "실패"));
        }
        const io = req.app.get("io");
        io.of(`/room-${req.params.roomId}`).emit("message", response);

        return res
            .status(200)
            .send(resFormat.successData(200, "성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const RoomChatAnswer = async (req, res, next) => {
    try {
        const response = await ChatMessageRepository.createRoomChatAnswer(
            req.user.id,
            parseInt(req.params.roomId),
            req.body.content,
            parseInt(req.body.answeredId, 10)
        );
        if (!response) {
            return res.status(400).send(resFormat.fail(400, "실패"));
        }
        const io = req.app.get("io");
        io.of(`/room-${req.params.roomId}`).emit("message", response);

        return res
            .status(200)
            .send(resFormat.successData(200, "성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetRoomChatAnswerList = async (req, res, next) => {
    try {
        const findAnswer = await ChatMessageRepository.findRoomAnswerChat(
            req.user.id,
            parseInt(req.params.roomId)
        );

        return res
            .status(200)
            .send(resFormat.successData(200, "조회성공", findAnswer));
    } catch (err) {
        console.error(err);
        next(err);
    }
};
