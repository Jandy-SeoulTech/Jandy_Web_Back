import * as CommentRepository from "../repositories/CommentRepository";
import * as UserRepository from "../repositories/UserRepository";
import { dbNow } from "../utils/dayUtils";

import bcrypt from "bcrypt";

import resFormat from "../utils/resFormat";

export const CreateComment = async (req, res, next) => {
    try {
        const joinUser = await UserRepository.CheckJoinChannel(
            req.user.id,
            parseInt(req.body.channelId, 10)
        );
        if (!joinUser[0]) {
            return res
                .status(401)
                .send(
                    resFormat.fail(
                        401,
                        "참여한 채널에만 댓글 작성이 가능합니다."
                    )
                );
        }
        const response = await CommentRepository.createComment(
            CreateOption(req.user.id, parseInt(req.body.postId, 10), req.body)
        );
        if (!response) {
            return res
                .status(500)
                .send(
                    resFormat.fail(500, "알수 없는 에러로 댓글 작성하기 실패")
                );
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "댓글 작성 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UpdateComment = async (req, res, next) => {
    try {
        const checkAuthor = await CommentRepository.checkMyComment(
            parseInt(req.params.commentId,10),
            req.user.id
        );
        if (!checkAuthor[0]) {
            return res
                .status(401)
                .send(resFormat.fail(401, "댓글 삭제 권한이 없습니다."));
        }
        const response = await CommentRepository.updateComment(
            UpdateOption(parseInt(req.params.commentId,10),req.body)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 수정 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "댓글 수정 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const DeleteComment = async (req, res, next) => {
    try {
        const checkAuthor = await CommentRepository.checkMyComment(
            parseInt(req.params.commentId,10),
            req.user.id
        );
        if (!checkAuthor[0]) {
            return res
                .status(401)
                .send(resFormat.fail(401, "자신의 댓글만 삭제 가능합니다."));
        }
        const response = await CommentRepository.deleteComment(
            parseInt(req.params.commentId,10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 삭제 실패"));
        }
        return res.status(200).send(resFormat.success(200, "댓글 삭제 성공"));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const CreateOption = (id, postId, bodydata) => {
    // DB에 맞추어 Option 설정
    const Option = {
        author: {
            connect: {
                id,
            },
        },
        content: bodydata.content,
        post: {
            connect: {
                id: parseInt(postId, 10),
            },
        },
        createdAt: dbNow(),
    };
    return Option;
};

const UpdateOption = (id,bodydata) => {
    // DB에 맞추어 Option 설정
    const Option = {
        id: parseInt(id, 10),
        content: bodydata.content,
        updatedAt: dbNow(),
    };
    return Option;
};
