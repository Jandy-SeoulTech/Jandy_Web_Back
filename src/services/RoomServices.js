import * as ChannelRepository from "../repositories/ChannelRepository";
import * as BanRepository from "../repositories/BanRepository";
import * as LikeRepository from "../repositories/LikeReposiotry";
import * as UserRepository from "../repositories/UserRepository";
import * as RoomUserRepository from "../repositories/RoomUserRepository";
import * as ChannelRoomRepository from "../repositories/ChannelRoomRepository";
import * as PostRepository from "../repositories/PostRepository";
import schedule from "node-schedule";

import resFormat from "../utils/resFormat";

export const RoomCreate = async (req, res, next) => {
    try {
        const checkPostClose = await PostRepository.CheckPostClosed(
            parseInt(req.body.postId, 10)
        );
        if (!checkPostClose[0]) {
            return res
                .status(401)
                .send(resFormat.fail(401, "안열린 채팅방이 아닙니다."));
        }
        const checkAuthor = await PostRepository.CheckMyPost(
            parseInt(req.body.postId),
            req.user.id
        );
        if (checkAuthor[0]) {
            return res
                .status(401)
                .send(
                    resFormat.fail(
                        401,
                        "자신의 포스트는 채팅방을 만들 수 없습니다."
                    )
                );
        }

        if (req.body.status === "Open") {
            const response = await ChannelRoomRepository.CreateRoom(
                req.body,
                req.user.id
            );
            const openPost = await PostRepository.UpdateOpen(
                parseInt(req.body.postId, 10)
            );
            if (response && openPost) {
                return res
                    .status(201)
                    .send(resFormat.successData(201, "채팅방 생성", response));
            } else {
                return res
                    .status(500)
                    .send(resFormat.fail(500, "알수없는 에러 발생"));
            }
        } else {
            const response = await ChannelRoomRepository.ReserveRoom(
                req.body,
                req.user.id
            );
            const reservePost = await PostRepository.UpdateReserve(
                parseInt(req.body.postId, 10),
                req.body.reservedTime
            );
            const date = new Date(req.body.reservedTime);
            const job = schedule.scheduleJob(date, async () => {
                await ChannelRoomRepository.updateOpenRoom(response.id);
                await PostRepository.UpdateOpen(parseInt(req.body.postId, 10));
            });

            if (response && reservePost) {
                return res
                    .status(201)
                    .send(resFormat.successData(201, "방 예약 성공", response));
            }
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetRoomList = async (req, res, next) => {
    try {
        const response = await ChannelRoomRepository.findByChannelId(
            parseInt(req.params.channelId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러 발생"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "조회성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const RoomExit = async (req, res, next) => {
    try {
        const response = await RoomUserRepository.updateOneStatus(
            parseInt(req.body.roomId, 10),
            parseInt(req.user.id, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러 발생"));
        }

        const participantInfo = await RoomUserRepository.findManyByRoomId(
            parseInt(req.body.roomId, 10)
        );
        const io = req.app.get("io");
        io.of(`/room-${req.body.roomId}`).emit("RoomInfo", participantInfo);

        return res
            .status(200)
            .send(resFormat.successData(200, "채팅방 나가기 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const RoomClose = async (req, res, next) => {
    try {
        const exRoom = await ChannelRoomRepository.findById(
            parseInt(req.body.roomId, 10)
        );
        if (exRoom.userId != req.user.id) {
            return res
                .status(401)
                .send(resFormat.fail(401, "방주인만 방을 끝낼 수 있습니다."));
        }

        const response = await ChannelRoomRepository.updateCloseRoom(exRoom.id);
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러 발생"));
        }

        /*
         게시글 상태 변경 로직 추가 예정
        */

        return res
            .status(200)
            .send(resFormat.successData(200, "채팅방 끝내기 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};
export const join = async (req, res, next) => {
    try {
        const response = await RoomUserRepository.findOneByRoomAndUserId(
            parseInt(req.body.roomId, 10),
            parseInt(req.user.id, 10)
        );
        console.log("response", response);
        if (!response) {
            const make = await RoomUserRepository.joinRoomUser(
                parseInt(req.body.roomId, 10),
                parseInt(req.user.id, 10)
            );
            return res.send(make);
        }
        return res.send(response);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const list = async (req, res, next) => {
    try {
        const participantInfo = await RoomUserRepository.findManyByRoomId(
            parseInt(req.body.roomId, 10)
        );
        if (!participantInfo) {
            return res.send("실패");
        }
        return res.send(participantInfo);
    } catch (err) {
        console.error(err);
        next(err);
    }
};
