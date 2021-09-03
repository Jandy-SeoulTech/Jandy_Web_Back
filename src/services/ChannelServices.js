import * as ChannelRepository from "../repositories/ChannelRepository";
import * as BanRepository from "../repositories/BanRepository";
import * as LikeRepository from "../repositories/LikeReposiotry";
import * as UserRepository from "../repositories/UserRepository";
import { dbNow } from "../utils/dayUtils";

import bcrypt from "bcrypt";

import resFormat from "../utils/resFormat";

export const CreateChannel = async (req, res, next) => {
    try {
        if (!(parseInt(req.body.userId, 10) === req.user.id)) {
            return res
                .status(401)
                .send(resFormat.fail(401, "본인소유의 채널만 생성 가능"));
        }
        const response = await ChannelRepository.createChannel(
            CreateOption(req.body)
        );
        //console.log(response);

        if (!response) {
            return res.status(500).send(resFormat.fail(500, "채널 생성 실패"));
        }
        const data = await ChannelRepository.findById(response.id);
        return res
            .status(200)
            .send(resFormat.successData(200, "채널 생성 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetChannelList = async (req, res, next) => {
    try {
        const adminChannel = await ChannelRepository.findAdminChannel(
            req.params.id,
            SelectOption
        );
        const ParticipantChannel = await ChannelRepository.findParticipantChannel(
            req.params.id,
            SelectOption
        );

        if (!ParticipantChannel) {
            return res.status(500).send(resFormat.fail(500, "알수없는 에러"));
        } else {
            return res.status(200).send(
                resFormat.successData(200, "채널 정보 리스트", {
                    adminChannl: adminChannel,
                    participantChannel: ParticipantChannel,
                })
            );
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetChannelInfo = async (req, res, nex) => {
    try {
        const data = await ChannelRepository.findById(
            parseInt(req.params.channelId,10)
        );
        if (!data) {
            return res
                .status(403)
                .send(resFormat.fail(403, "채널이 존재 하지 않습니다."));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "채널 정보 가져오기 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UpdateChannel = async (req, res, next) => {
    try {
        if (!(parseInt(req.body.userId, 10) === req.user.id)) {
            return res
                .status(401)
                .send(resFormat.fail(401, "본인소유의 채널만 수정 가능"));
        }
        const response = await ChannelRepository.updateChannel(
            UpdateOption(req.body)
        );
        if (!response) {
            return res.status(500).send(resFormat.fail(500, "알수없는 에러"));
        }

        const data = await ChannelRepository.findById(
            parseInt(req.body.channelId),
            10
        );
        if (!data) {
            return res
                .status(403)
                .send(resFormat.fail(403, "채널이 존재 하지 않습니다."));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "채널 수정 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const LikeChannel = async (req, res, next) => {
    try {
        const exLike = await LikeRepository.findLike(
            req.user.id,
            parseInt(req.body.channelId, 10)
        );
        if (exLike) {
            return res
                .status(403)
                .send(resFormat.fail(403, "이미 좋아요를 하였습니다."));
        }
        const response = await UserRepository.LikeOnChannel(
            req.user.id,
            parseInt(req.body.channelId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 좋아요 실패"));
        }
        const data = await ChannelRepository.findById(
            parseInt(req.body.channelId, 10)
        );
        return res
            .status(200)
            .send(resFormat.successData(200, "좋아요 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UnLikeChannel = async (req, res, next) => {
    try {
        const exLike = await LikeRepository.findLike(
            req.user.id,
            parseInt(req.body.channelId, 10)
        );
        if (!exLike) {
            return res
                .status(403)
                .send(resFormat.fail(403, "좋아요 상태가 아닙니다."));
        }
        const response = await UserRepository.unLikeOnChannel(
            req.user.id,
            parseInt(req.body.channelId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 좋아요 취소 실패"));
        }
        const data = await ChannelRepository.findById(
            parseInt(req.body.channelId, 10)
        );
        return res
            .status(200)
            .send(resFormat.successData(200, "좋아요 취소 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const EnterChannel = async (req, res, next) => {
    try {
        if (parseInt(req.body.adminId, 10) === req.user.id) {
            return res
                .status(401)
                .send(resFormat.fail(401, "본인소유의 채널은 참여하기 불가능"));
        }
        const exBan = await BanRepository.findBan(
            req.user.id,
            parseInt(req.body.channelId, 10)
        );
        if (exBan) {
            return res
                .status(403)
                .send(
                    resFormat.fail(403, "추방 당한 채널에 들어갈 수 없습니다")
                );
        }
        const response = await UserRepository.EnterChannel(
            req.user.id,
            parseInt(req.body.channelId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 참가하기 실패"));
        }
        const data = await ChannelRepository.findById(
            parseInt(req.body.channelId, 10)
        );
        return res
            .status(200)
            .send(resFormat.successData(200, "참가하기 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const ExitChannel = async (req, res, next) => {
    try {
        if (parseInt(req.body.adminId, 10) === req.user.id) {
            return res
                .status(401)
                .send(
                    resFormat.fail(
                        401,
                        "본인소유의 채널은 참여하기 취소 불가능"
                    )
                );
        }
        const response = await UserRepository.ExitChannel(
            req.user.id,
            parseInt(req.body.channelId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(
                    resFormat.fail(500, "알수 없는 에러로 참여하기 취소 실패")
                );
        }
        const data = await ChannelRepository.findById(
            parseInt(req.body.channelId, 10)
        );
        return res
            .status(200)
            .send(resFormat.successData(200, "참여하기 취소 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const ChangeAdmin = async (req, res, next) => {
    try {
        if (!(parseInt(req.body.adminId, 10) === req.user.id)) {
            return res
                .status(401)
                .send(resFormat.fail(401, "본인소유의 채널만 접근 가능"));
        }
        const response = await UserRepository.ChangeAdmin(
            parseInt(req.body.userId, 10),
            parseInt(req.body.channelId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(
                    resFormat.fail(500, "알수 없는 에러로 관리자 넘겨주기 실패")
                );
        }
        const data = await ChannelRepository.findById(
            parseInt(req.body.channelId, 10)
        );
        return res
            .status(200)
            .send(resFormat.successData(200, "관리자 넘겨주기 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const Ban = async (req, res, next) => {
    try {
        if (!(parseInt(req.body.adminId, 10) === req.user.id)) {
            return res
                .status(401)
                .send(resFormat.fail(401, "본인소유의 채널만 접근 가능"));
        }
        const response = await UserRepository.Ban(
            parseInt(req.body.userId, 10),
            parseInt(req.body.channelId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 추방하기 실패"));
        }
        const data = await ChannelRepository.findById(
            parseInt(req.body.channelId, 10)
        );
        return res
            .status(200)
            .send(resFormat.successData(200, "추방하기 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetMyChannelInfo = async (req, res, next) => {
    try {
        const adminChannel = await ChannelRepository.findAdminChannel(
            req.user.id,
            SelectOption
        );
        const ParticipantChannel = await ChannelRepository.findParticipantChannel(
            req.user.id,
            SelectOption
        );

        if (!ParticipantChannel) {
            return res.status(500).send(resFormat.fail(500, "알수없는 에러"));
        } else {
            return res.status(200).send(
                resFormat.successData(200, "내 채널 정보", {
                    adminChannl: adminChannel,
                    participantChannel: ParticipantChannel,
                })
            );
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
// Option 생성
const CreateOption = (bodydata) => {
    // DB에 맞추어 Option 설정

    const Option = {
        adminId: parseInt(bodydata.userId, 10),
        name: bodydata.name,
        introduce: bodydata.introduce,
        tags: {
            create: ChangeObject(bodydata.tag),
        },
        category: {
            create: {
                category: {
                    create: {
                        name: bodydata.category,
                        createdAt: dbNow(),
                    },
                },
                createdAt: dbNow(),
            },
        },
        channelImage: {
            create: {
                src: bodydata.src,
                createdAt: dbNow(),
            },
        },
        createdAt: dbNow(),
    };
    return Option;
};
const UpdateOption = (bodydata) => {
    // DB에 맞추어 Option 설정

    let Option = {
        id: parseInt(bodydata.channelId, 10),
        updatedAt: dbNow(),
    };
    if (bodydata.introduce) {
        Option.introduce = bodydata.introduce;
    }
    if (bodydata.tag) {
        Option.tags = {
            create: ChangeObject(bodydata.tag),
        };
    }
    if (bodydata.category) {
        Option.category = {
            update: {
                category: {
                    update: {
                        name: bodydata.category,
                        updatedAt: dbNow(),
                    },
                },
                updatedAt: dbNow(),
            },
        };
    }
    if (bodydata.channelImage) {
        Option.channelImage = {
            update: {
                src: bodydata.src,
                updatedAt: dbNow(),
            },
        };
    }
    return Option;
};
const ChangeObject = (arr) => {
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push({
            tag: { create: { name: v, createdAt: dbNow() } },
            createdAt: dbNow(),
        });
    });
    return ArrayChange;
};

//MyChannel Page SelectOption
const SelectOption = {
    id: true,
    name: true,
    introduce: true,
    participants: {
        select: {
            userId: true,
        },
    },
    channelImage: {
        select: {
            src: true,
        },
    },
    tags: {
        include: {
            tag: {
                select: {
                    name: true,
                },
            },
        },
    },
    category: {
        include: {
            category: {
                select: {
                    name: true,
                },
            },
        },
    },
};
