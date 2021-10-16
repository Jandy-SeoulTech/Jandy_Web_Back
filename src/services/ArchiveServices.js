import * as ArchiveRepository from "../repositories/ArchiveRepository";
import * as UserRepository from "../repositories/UserRepository";
import * as PostRepository from "../repositories/PostRepository";
import * as ChannelRoomRepository from "../repositories/ChannelRoomRepository";
import * as LikeRepository from "../repositories/LikeRepository";
import { dbNow } from "../utils/dayUtils";

import resFormat from "../utils/resFormat";

export const CreateArchive = async (req, res, next) => {
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
                        "참여한 채널에서만 아카이브 작성이 가능합니다."
                    )
                );
        }
        if (req.body.postId) {
            const checkPostCleared = await PostRepository.checkPostCleared(
                parseInt(req.body.postId, 10)
            );
            if (!checkPostCleared[0]) {
                return res
                    .status(401)
                    .send(resFormat.fail(401, "종료된 채팅방이 아닙니다."));
            }
        }

        const response = await ArchiveRepository.createArchive(
            CreateOption(
                req.user.id,
                parseInt(req.body.channelId, 10),
                parseInt(req.body.postId, 10),
                req.body
            )
        );
        if (!response) {
            return res
                .status(500)
                .send(
                    resFormat.fail(
                        500,
                        "알수 없는 에러로 아카이브 작성하기 실패"
                    )
                );
        }
        if (req.body.postId) {
            const roomArchived = await ChannelRoomRepository.updateArchivedRoom(
                parseInt(req.body.postId)
            );
            const postArchived = await PostRepository.updateArchived(
                parseInt(req.body.postId)
            );
            if (!roomArchived || !postArchived) {
                return res
                    .status(500)
                    .send(resFormat.fail(500, "아카이빙 등록 실패"));
            }
        }

        return res
            .status(200)
            .send(resFormat.successData(200, "아카이브 작성 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const DeleteArchive = async (req, res, next) => {
    try {
        const checkOwner = await UserRepository.CheckMyArchive(
            req.user.id,
            parseInt(req.params.archiveId, 10)
        );
        if (!checkOwner[0]) {
            return res
                .status(401)
                .send(resFormat.fail(401, "아카이빙 삭제 권한이 없습니다."));
        }
        const response = await ArchiveRepository.deleteArchive(
            parseInt(req.params.archiveId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 삭제 실패"));
        }
        return res
            .status(200)
            .send(resFormat.success(200, "아카이브 삭제 성공"));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UpdateArchive = async (req, res, next) => {
    try {
        const checkOwner = await UserRepository.CheckMyArchive(
            req.user.id,
            parseInt(req.params.archiveId, 10)
        );
        if (!checkOwner[0]) {
            return res
                .status(401)
                .send(resFormat.fail(401, "아카이브 수정 권한이 없습니다."));
        }
        const response = await ArchiveRepository.updateArchive(
            parseInt(req.params.archiveId, 10),
            UpdateOption(req.body)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 수정 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "아카이브 수정 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetArchive = async (req, res, next) => {
    try {
        const response = await ArchiveRepository.getArchiveById(
            parseInt(req.params.archiveId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 정보 얻기 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "정보 얻기 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetChannelArchiveList = async (req, res, next) => {
    try {
        const joinUser = await UserRepository.CheckJoinChannel(
            req.user.id,
            parseInt(req.params.channelId, 10)
        );
        let isPublic = true;
        if (joinUser[0]) {
            isPublic = false;
        }
        const response = await ArchiveRepository.getArchiveListByChannelId(
            parseInt(req.params.channelId, 10),
            isPublic,
            parseInt(req.query.page, 10),
            parseInt(req.query.pageSize, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 정보 얻기 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "정보 얻기 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetUserArchiveList = async (req, res, next) => {
    try {
        let isPublic = true;
        if (parseInt(req.params.userId, 10) === req.user.id) {
            isPublic = false;
        }
        const response = await ArchiveRepository.getArchiveListByUserId(
            parseInt(req.params.userId, 10),
            isPublic
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 정보 얻기 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "정보 얻기 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const LikeArchive = async (req, res, next) => {
    try {
        const exArchive = await ArchiveRepository.getArchiveById(
            parseInt(req.body.archiveId, 10)
        );
        if (!exArchive) {
            return res
                .status(403)
                .send(resFormat.fail(403, "존재하지 않는 아카이브 입니다."));
        }
        const exLike = await LikeRepository.findArchiveLike(
            req.user.id,
            parseInt(req.body.archiveId, 10)
        );
        if (exLike) {
            return res
                .status(403)
                .send(resFormat.fail(403, "이미 좋아요를 하였습니다."));
        }
        if (exArchive.status == "Private") {
            if (req.body.channelId == null) {
                return res
                    .status(404)
                    .send(resFormat.fail(404, "channelId가 없습니다."));
            }
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
                            "참여한 채널에서만 좋아요가 가능합니다."
                        )
                    );
            }
        }
        const response = await UserRepository.LikeOnArchive(
            req.user.id,
            parseInt(req.body.archiveId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 좋아요 실패"));
        }
        return res.status(200).send(resFormat.success(200, "좋아요 성공"));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UnLikeArchive = async (req, res, next) => {
    try {
        const exLike = await LikeRepository.findArchiveLike(
            req.user.id,
            parseInt(req.body.archiveId, 10)
        );
        if (!exLike) {
            return res
                .status(403)
                .send(resFormat.fail(403, "좋아요 상태가 아닙니다."));
        }
        const response = await UserRepository.unLikeOnArchive(
            req.user.id,
            parseInt(req.body.archiveId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 좋아요 취소 실패"));
        }
        return res.status(200).send(resFormat.success(200, "좋아요 취소 성공"));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const CreateTags = (tags) => {
    return tags.map((v) => {
        return {
            tag: { create: { name: v, createdAt: dbNow() } },
            createdAt: dbNow(),
        };
    });
};

const CreateImages = (arr) => {
    if (arr === null) return { src: null, createdAt: dbNow() };
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push({ src: v, createdAt: dbNow() });
    });
    return ArrayChange;
};

const CreateOption = (id, channelId, postId, bodydata) => {
    // DB에 맞추어 Option 설정
    let Option = {
        owner: {
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
            create: CreateImages(bodydata.images),
        },
        tags: {
            create: CreateTags(bodydata.tags),
        },
        createdAt: dbNow(),
    };
    if (postId) {
        Option.post = {
            connect: {
                id: parseInt(postId, 10),
            },
        };
    }
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
    return Option;
};

const UpdateObject = (arr) => {
    if (arr === null) return { src: null, createdAt: dbNow() };
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push({ src: v, createdAt: dbNow(), updatedAt: dbNow() });
    });
    return ArrayChange;
};
