import * as PostRepository from "../repositories/PostRepository";
import * as UserRepository from "../repositories/UserRepository";
import * as AttentionRepository from "../repositories/AttentionRepository";
import { dbNow } from "../utils/dayUtils";
import resFormat from "../utils/resFormat";

export const CreatePost = async (req, res, next) => {
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
                        "참여한 채널에만 포스트 작성이 가능합니다."
                    )
                );
        }
        const response = await PostRepository.createPost(
            CreateOption(
                req.user.id,
                parseInt(req.body.channelId, 10),
                req.body
            )
        );
        if (!response) {
            return res
                .status(500)
                .send(
                    resFormat.fail(500, "알수 없는 에러로 포스트 작성하기 실패")
                );
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "포스트 작성 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UpdatePost = async (req, res, next) => {
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
                        "참여한 채널에만 포스트 작성이 가능합니다."
                    )
                );
        }
        const checkAuthor = await PostRepository.checkMyPost(
            parseInt(req.params.postId, 10),
            req.user.id
        );
        if (!checkAuthor[0]) {
            return res
                .status(401)
                .send(
                    resFormat.fail(401, "자신의 포스트만 수정이 가능합니다.")
                );
        }
        const response = await PostRepository.updatePost(
            parseInt(req.params.postId, 10),
            UpdateOption(req.body)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 수정 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "포스트 수정 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const DeletePost = async (req, res, next) => {
    try {
        const checkAuthor = await PostRepository.checkMyPost(
            parseInt(req.params.postId),
            req.user.id
        );
        const checkAdmin = await UserRepository.CheckMyChannel(
            req.user.id,
            parseInt(req.body.channelId)
        );
        if (!checkAuthor[0] && !checkAdmin[0]) {
            return res
                .status(401)
                .send(resFormat.fail(401, "포스트 삭제 권한이 없습니다."));
        }
        const response = await PostRepository.deletePost(
            parseInt(req.params.postId)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 삭제 실패"));
        }
        return res.status(200).send(resFormat.success(200, "포스트 삭제 성공"));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetPostInfo = async (req, res, next) => {
    try {
        const data = await PostRepository.findById(
            parseInt(req.params.postId, 10)
        );
        if (!data) {
            return res
                .status(500)
                .send(
                    resFormat.fail(
                        500,
                        "알수 없는 에러로 포스트 정보 찾기 실패"
                    )
                );
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "포스트 정보 얻기 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetPostListById = async (req, res, next) => {
    try {
        const data = await PostRepository.findPostByChannelId(
            parseInt(req.params.channelId, 10)
        );
        if (!data) {
            return res
                .status(500)
                .send(
                    resFormat.fail(
                        500,
                        "알수 없는 에러로 포스트 리스트 정보 찾기 실패"
                    )
                );
        }
        return res
            .status(200)
            .send(
                resFormat.successData(200, "포스트 리스트 정보 얻기 성공", data)
            );
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const BeAttention = async (req, res, next) => {
    try {
        const checkAttention = await AttentionRepository.findById(
            req.user.id,
            parseInt(req.params.postId, 10)
        );
        if (checkAttention) {
            return res
                .status(401)
                .send(resFormat.fail(401, "이미 궁금쓰 상태입니다."));
        }
        const response = await UserRepository.Attetnion(
            req.user.id,
            parseInt(req.params.postId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 실패"));
        }
        const data = await PostRepository.findById(parseInt(req.params.postId));
        if (!data) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "궁금쓰 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const NotAttention = async (req, res, next) => {
    try {
        const checkAttention = await AttentionRepository.findById(
            req.user.id,
            parseInt(req.params.postId, 10)
        );
        if (!checkAttention) {
            return res
                .status(401)
                .send(resFormat.fail(401, "궁금쓰 상태가 아닙니다."));
        }
        const response = await UserRepository.NotAttention(
            req.user.id,
            parseInt(req.params.postId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 실패"));
        }
        const data = await PostRepository.findById(parseInt(req.params.postId));
        if (!data) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "궁금쓰 취소 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const CreateOption = (id, channelId, bodydata) => {
    // DB에 맞추어 Option 설정
    const Option = {
        author: {
            connect: {
                id,
            },
        },
        title: bodydata.title,
        status: bodydata.status,
        content: bodydata.content,
        channel: {
            connect: {
                id: parseInt(channelId, 10),
            },
        },
        images: {
            create: CreateObject(bodydata.images),
        },
        reservation: bodydata.reservation,
        createdAt: dbNow(),
    };
    return Option;
};

const UpdateOption = (bodydata) => {
    // DB에 맞추어 Option 설정
    let Option = {
        updatedAt: dbNow(),
    };
    if (bodydata.title) {
        Option.title = bodydata.title;
    }
    if (bodydata.content) {
        Option.content = bodydata.content;
    }
    if (bodydata.status) {
        Option.status = bodydata.status;
    }
    if (bodydata.images) {
        Option.images = {
            create: UpdateObject(bodydata.images),
        };
    }
    if (bodydata.reservation) {
        Option.reservation = bodydata.reservation;
    }
    return Option;
};

const CreateObject = (arr) => {
    if (arr === null) return { src: null, createdAt: dbNow() };
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push({ src: v, createdAt: dbNow() });
    });
    return ArrayChange;
};

const UpdateObject = (arr) => {
    if (arr === null) return { src: null, createdAt: dbNow() };
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push({ src: v, createdAt: dbNow(), updatedAt: dbNow() });
    });
    return ArrayChange;
};
