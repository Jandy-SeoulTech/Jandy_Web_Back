import * as ReviewRepository from "../repositories/ReviewRepository";
import * as RoomUserRepository from "../repositories/RoomUserRepository";
import resFormat from "../utils/resFormat";

export const ReviewCreate = async (req, res, next) => {
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

export const GetReviewList = async (req, res, next) => {
    try {
        const findReviews = await ReviewRepository.findReviewByUserId(
            parseInt(req.params.userId, 10)
        );
        if (!findReviews[0]) {
            return res
                .status(200)
                .send(
                    resFormat.successData(200, "등록된 리뷰가 없습니다.", null)
                );
        }
        return res
            .status(200)
            .send(
                resFormat.successData(200, "리뷰 리스트 조회 성공", findReviews)
            );
    } catch (err) {
        console.error(err);
        next(err);
    }
};
