import * as UserRepository from "../repositories/UserRepository";
import * as ProfileRepository from "../repositories/ProfileRepository";
import * as ImageRepository from "../repositories/ImageRepostiory";
import * as TalentRepository from "../repositories/TalentRepository";
import bcrypt from "bcrypt";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
import resFormat from "../utils/resFormat";

export const CreateProfile = async (req, res, next) => {
    try {
        const exProfile = await ProfileRepository.fineByUserId(
            parseInt(req.body.userId, 10)
        );
        if (exProfile[0]) {
            return res
                .status(403)
                .send(resFormat.fail(403, "이미 프로필이 존재합니다."));
        }
        //null 값이 들어온 경우 빈 문자열로 변환
        req.body.welltalent = req.body.welltalent || "";
        req.body.interesttalent = req.body.interesttalent || "";

        const WellTalentArray = req.body.welltalent.split(",");
        const InterestArray = req.body.interesttalent.split(",");

        //유저 아이디로 프로필 생성∏

        const Response = await ProfileRepository.createProfile(
            MakeOption(req.body, WellTalentArray, InterestArray, "create")
        );
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
        const UserProfile = await UserRepository.findByIdWithProfile(
            parseInt(req.params.userId, 10)
        );
        if (!UserProfile) {
            return res
                .status(403)
                .send(resFormat.fail(403, "유저의 프로필이 존재하지 않습니다"));
        }
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
        //nickname은 null을 허용하지 않음.
        if (req.body.nickname === (undefined && null)) {
            return res
                .status(403)
                .send(resFormat.fail(401, "닉네임값이 없습니다."));
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

        //null값-> 빈 문자열 변경
        req.body.welltalent = req.body.welltalent || "";
        req.body.interesttalent = req.body.interesttalent || "";
        //split 문자열 배열로 반환
        const WellTalentArray = req.body.welltalent.split(",");
        const InterestArray = req.body.interesttalent.split(",");

        //갯수가 동일한 department, introduce, image는 바로 업데이트 가능.
        //기존 welltalnet와 interesttalent는 삭제 후 재생성
        const Response = await ProfileRepository.updateProfile(
            exProfile[0].id,
            req.body.department,
            req.body.introduce,
            req.body.src,
            ChangeObject(WellTalentArray),
            ChangeObject(InterestArray)
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

//옵션 생성 함수
const MakeOption = (bodydata, WellTalentArray, InterestArray) => {
    // DB data 옵션 설정.
    const dataOption = {
        userId: parseInt(bodydata.userId, 10),
        department: bodydata.department,
        introduce: bodydata.introduce,
        createdAt: now,
        welltalent: {
            createMany: {
                data: ChangeObject(WellTalentArray),
            },
        },
        interesttalent: {
            createMany: {
                data: ChangeObject(InterestArray),
            },
        },
        profileImage: {
            create: {
                src: bodydata.src,
                createdAt: now,
            },
        },
    };

    return dataOption;
};

const ChangeObject = (arr) => {
    if (arr[0] === "") return { contents: null, createdAt: now };
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push({ contents: v, createdAt: now });
    });
    return ArrayChange;
};
