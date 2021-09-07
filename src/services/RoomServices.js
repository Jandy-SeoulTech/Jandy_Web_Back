import * as ReviewRepository from "../repositories/ReviewRepository";
import * as RoomUserRepository from "../repositories/RoomUserRepository";
import * as ChannelRoomRepository from "../repositories/ChannelRoomRepository";
import * as PostRepository from "../repositories/PostRepository";
import schedule from "node-schedule";

import resFormat from "../utils/resFormat";

export const RoomCreate = async (req, res, next) => {
    try {
        const checkPostClose = await PostRepository.checkPostClosed(
            parseInt(req.body.postId, 10)
        );
        if (!checkPostClose[0]) {
            return res
                .status(401)
                .send(resFormat.fail(401, "안열린 채팅방이 아닙니다."));
        }
        const checkAuthor = await PostRepository.checkMyPost(
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
            const openPost = await PostRepository.updateOpen(
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
            const reservePost = await PostRepository.updateReserve(
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
        const findOpenRoom = await ChannelRoomRepository.findOpenRoomByChannelId(
            parseInt(req.params.channelId, 10)
        );
        if (!findOpenRoom[0]) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러 발생"));
        }
        const findReservedRoom = await ChannelRoomRepository.findReservedRoomByChannelId(
            parseInt(req.params.channelId, 10)
        );
        return res.status(200).send(
            resFormat.successData(200, "조회성공", {
                openRoom: findOpenRoom,
                reservedRoom: findReservedRoom,
            })
        );
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
        //post 상태 clear변경
        await PostRepository.updateClaer(exRoom.postId);

        return res
            .status(200)
            .send(resFormat.successData(200, "채팅방 끝내기 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const Review = async (req, res, next) => {
    try {
        const reviewCheck = await RoomUserRepository.findReviewStatus(
            parseInt(req.body.roomId, 10),
            req.user.id
        );

        if (!reviewCheck[0]) {
            return res
                .status(401)
                .send(resFormat.fail(401, "리뷰를 하실수 없습니다."));
        }

        const review = await ReviewRepository.createReview(
            req.user.id,
            parseInt(req.body.reviewedUserId, 10),
            req.body.content,
            req.body.status,
            parseInt(req.body.channelId, 10)
        );
        if (!review) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 리뷰 실패"));
        }

        const deleteRoomUser = await RoomUserRepository.deleteOne(
            parseInt(req.body.roomId, 10),
            req.user.id
        );

        if (review && deleteRoomUser) {
            return res
                .status(200)
                .send(resFormat.successData(200, "리뷰작성 성공", review));
        }
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
