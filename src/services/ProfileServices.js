import * as UserRepository from "../repositories/UserRepository";
import * as ProfileRepository from "../repositories/ProfileRepository";
import * as FollowRepository from "../repositories/FollowRepository";
import * as ChannelRepository from "../repositories/ChannelRepository";
import * as ChannelRoomRepository from "../repositories/ChannelRoomRepository";
import * as ReviewRepository from "../repositories/ReviewRepository";
import bcrypt from "bcrypt";
import resFormat from "../utils/resFormat";
import { dbNow } from "../utils/dayUtils";

export const CreateProfile = async (req, res, next) => {
    try {
        if (!(parseInt(req.body.userId, 10) === req.user.id)) {
            return res
                .status(401)
                .send(resFormat.fail(401, "본인의 프로필만 생성 가능"));
        }

        const exProfile = await ProfileRepository.fineByUserId(
            parseInt(req.body.userId, 10)
        );

        if (exProfile[0]) {
            return res
                .status(403)
                .send(resFormat.fail(403, "이미 프로필이 존재합니다."));
        }

        //유저 아이디로 프로필 생성
        const Response = await ProfileRepository.createProfile(
            MakeOption(req.body, req.body.wellTalent, req.body.interestTalent)
        );

        if (!Response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "프로필 생성 실패"));
        }

        const ProfileData = await ProfileRepository.findById(Response.id);

        res.status(200).send(
            resFormat.successData(200, "프로필 생성 성공", ProfileData)
        );
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetUserProfile = async (req, res, next) => {
    try {
        const exProfile = await ProfileRepository.fineByUserId(
            parseInt(req.params.userId, 10)
        );
        if (!exProfile[0]) {
            return res
                .status(403)
                .send(
                    resFormat.fail(403, "유저의 프로필이 존재하지 않습니다.")
                );
        }
        const UserProfile = await UserRepository.findByIdWithProfile(
            parseInt(req.params.userId, 10)
        );
        return res
            .status(200)
            .send(resFormat.successData(200, "프로필 조회 성공", UserProfile));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UpdateUserProfile = async (req, res, next) => {
    try {
        //다른 유저 접근 금지
        if (!(parseInt(req.body.userId, 10) === req.user.id)) {
            return res
                .status(401)
                .send(resFormat.fail(401, "자신의 프로필만 수정 가능합니다"));
        }

        const exProfile = await ProfileRepository.fineByUserId(req.user.id);

        if (!exProfile) {
            return res
                .status(403)
                .send(resFormat.fail(403, "유저의 프로필이 존재하지 않습니다"));
        }
        //nickname change
        await UserRepository.updateNickname({
            id: req.user.id,
            nickname: req.body.nickname,
        });

        //갯수가 동일한 department, introduce, image는 바로 업데이트 가능.
        //기존 welltalnet와 interesttalent는 삭제 후 재생성
        const Response = await ProfileRepository.updateProfile(
            exProfile[0].id,
            req.body.department,
            req.body.introduce,
            req.body.src,
            ChangeObject(req.body.wellTalent),
            ChangeObject(req.body.interestTalent)
        );

        if (!Response) {
            return res.status(500).send(resFormat.fail(500, "알수없는 에러"));
        }

        //유저 정보 전체를 다시 조회후 보여줌
        const UserProfile = await UserRepository.findByIdWithProfile(
            parseInt(req.body.userId, 10)
        );
        return res
            .status(200)
            .send(resFormat.successData(200, "업데이트 성공", UserProfile));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const CheckPassword = async (req, res, next) => {
    try {
        const exUser = await UserRepository.findById(req.user.id);
        const result = await bcrypt.compare(req.body.password, exUser.password);
        if (result) {
            return res
                .status(200)
                .send(resFormat.success(200, "비밀번호가 일치함"));
        }
        return res
            .status(403)
            .send(resFormat.fail(403, "비밀번호가 일치하지 않음."));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UpdatePassword = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 12);
        const result = await UserRepository.updatePassword(
            req.user.id,
            req.body.password
        );
        if (result) {
            return res
                .status(200)
                .send(resFormat.success(200, "비밀번호 변경 성공"));
        } else {
            return res.status(500).send(resFormat.fail(500, "알수 없는 에러"));
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UserFollow = async (req, res, next) => {
    try {
        if (req.user.id === parseInt(req.body.followingId, 10)) {
            return res
                .status(403)
                .send(resFormat.fail(403, "스스로를 팔로우 할수 없습니다."));
        }
        const exUser = await UserRepository.findById(
            parseInt(req.body.followingId, 10)
        );
        if (!exUser) {
            return res
                .status(403)
                .send(resFormat.fail(403, "없는 유저 팔로우 할 수 없음."));
        }

        const exFollow = await FollowRepository.findFollow(
            req.user.id,
            parseInt(req.body.followingId, 10)
        );
        if (exFollow) {
            return res
                .status(403)
                .send(resFormat.fail(403, "이미 팔로우 했습니다"));
        }
        const response = await UserRepository.Follow(
            req.user.id,
            parseInt(req.body.followingId, 10)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 팔로우 실패"));
        }
        const UserProfile = await UserRepository.findByIdWithProfile(
            req.user.id
        );

        return res
            .status(200)
            .send(resFormat.successData(200, "팔로우 성공", UserProfile));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const UserUnFollow = async (req, res, next) => {
    try {
        if (req.user.id === parseInt(req.body.followingId, 10)) {
            return res
                .status(403)
                .send(
                    resFormat.fail(403, "스스로를 팔로우 취소 할수 없습니다.")
                );
        }

        const exUser = await UserRepository.findById(
            parseInt(req.body.followingId, 10)
        );

        if (!exUser) {
            return res
                .status(403)
                .send(resFormat.fail(403, "없는 유저 팔로우 취소 할 수 없음."));
        }

        const exFollow = await FollowRepository.findFollow(
            req.user.id,
            parseInt(req.body.followingId, 10)
        );

        if (!exFollow) {
            return res
                .status(403)
                .send(resFormat.fail(403, "이미 팔로우관계가 아닙니다"));
        }

        const response = await UserRepository.unFollow(
            req.user.id,
            parseInt(req.body.followingId, 10)
        );

        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 팔로우 실패"));
        }

        const UserProfile = await UserRepository.findByIdWithProfile(
            req.user.id
        );

        return res
            .status(200)
            .send(resFormat.successData(200, "팔로우 취소 성공", UserProfile));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const FollowerList = async (req, res, next) => {
    try {
        const followerList = await UserRepository.findFollowerList(
            parseInt(req.params.userId, 10)
        );
        if (!followerList[0]) {
            return res
                .status(200)
                .send(resFormat.successData(200, "팔로워가 없습니다", null));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "팔로워 리스트", followerList));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const FollowingList = async (req, res, next) => {
    try {
        const followingList = await UserRepository.findFollowingList(
            parseInt(req.params.userId, 10)
        );
        if (!followingList[0]) {
            return res
                .status(200)
                .send(
                    resFormat.successData(200, "팔로잉한 사람이 없습니다", null)
                );
        }

        return res
            .status(200)
            .send(resFormat.successData(200, "팔로윙 리스트", followingList));
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
        const participantChannel =
            await ChannelRepository.findParticipantChannel(
                req.user.id,
                SelectOption
            );
        const ownerRoom = await ChannelRoomRepository.findOwnerRoom(
            req.user.id
        );
        const participantRoom = await ChannelRoomRepository.findParticipantRoom(
            req.user.id
        );
        if (!participantChannel) {
            return res.status(500).send(resFormat.fail(500, "알수없는 에러"));
        } else {
            return res.status(200).send(
                resFormat.successData(200, "내 채널 정보", {
                    adminChannel,
                    participantChannel,
                    ownerRoom,
                    participantRoom,
                })
            );
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

//옵션 생성 함수
const MakeOption = (bodydata, WellTalentArray, InterestArray) => {
    // DB data 옵션 설정.
    const dataOption = {
        userId: parseInt(bodydata.userId, 10),
        department: bodydata.department,
        introduce: bodydata.introduce,
        createdAt: dbNow(),
        wellTalent: {
            createMany: {
                data: ChangeObject(WellTalentArray),
            },
        },
        interestTalent: {
            createMany: {
                data: ChangeObject(InterestArray),
            },
        },
        profileImage: bodydata.src,
    };

    return dataOption;
};

const ChangeObject = (arr) => {
    if (arr === null) return { contents: null, createdAt: dbNow() };
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push({ contents: v, createdAt: dbNow() });
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
    channelImage: true,
    tags: {
        include: {
            tag: {
                select: {
                    name: true,
                },
            },
        },
    },
    category: true,
};
//Follower & FollowingList SelectOption

const FollowListSelectOption = {
    id: true,
    email: true,
    nickname: true,
    profile: {
        select: {
            department: true,
            introduce: true,
            wellTalent: true,
            interestTalent: true,
            profileImage: true,
        },
    },
};
