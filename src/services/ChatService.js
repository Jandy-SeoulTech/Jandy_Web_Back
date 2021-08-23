import * as ChannelRepository from "../repositories/ChannelRepository";
import * as UserRepository from "../repositories/UserRepository";
import resFormat from "../utils/resFormat";

export const MainChatLog = async (req, res, next) => {
    try {
        const response = await ChannelRepository.ChatMessage(
            parseInt(req.params.channelId)
        );
        if (!response) {
            return res.status(400).send(resFormat.fail(400, "실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const MainChat = async (req, res, next) => {
    try {
        const joinUser = await UserRepository.CheckJoinChannel(
            req.user.id,
            parseInt(req.params.channelId)
        );
        console.log(joinUser);
        if (!joinUser[0]) {
            return res
                .status(401)
                .send(
                    resFormat.fail(401, "참여한 채널에만 채팅이 가능합니다.")
                );
        }

        const response = await ChannelRepository.createChat(
            req.user.id,
            parseInt(req.params.channelId),
            req.body.content
        );
        if (!response) {
            return res.status(400).send(resFormat.fail(400, "실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};
