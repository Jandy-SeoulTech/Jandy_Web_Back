import * as UserRepository from "../repositories/UserRepository";
import * as ProfileRepository from "../repositories/ProfileRepository";
import * as ImageRepository from "../repositories/ImageRepostiory";
import * as TalentRepository from "../repositories/TalentRepository";

import resFormat from "../utils/resFormat";

export const CreateProfile = async (req, res, next) => {
    try {
        const exProfile = await ProfileRepository.fineByUserId(
            parseInt(req.body.userId, 10)
        );
        if (exProfile[0]) {
            res.status(403).send(
                resFormat.fail(403, "이미 프로필이 존재합니다.")
            );
        }
        //유저 아이디로 프로필 생성
        const Response = await ProfileRepository.create(
            parseInt(req.body.userId, 10)
        );
        //소속 데이터가 있는 경우 추가
        if (req.body.department) {
            await ProfileRepository.updateByDepartment(
                Response.id,
                req.body.department
            );
        }
        console.log("테스트");
        //자기소개 데이터가 있는 경우 추가
        if (req.body.introduce) {
            await ProfileRepository.updateByIntroduce(
                Response.id,
                req.body.introduce
            );
        }
        //이미지를 준경 우프로필 id와 이미지 src로 이미지 생성
        if (req.body.src) {
            await ImageRepository.createProfileImage(req.body.src, Response.id);
        }
        //각각의 재능 DB에 따로 저장.
        if (req.body.wellTalent) {
            const WellTalentArray = req.body.wellTalent.split(",");
            WellTalentArray.map(async (contents) => {
                await TalentRepository.createWellTalent(contents, Response.id);
            });
        }
        if (req.body.interestTalent) {
            const InterestArray = req.body.interestTalent.split(",");
            InterestArray.map(async (contents) => {
                await TalentRepository.createInterestTalent(
                    contents,
                    Response.id
                );
            });
        }
        //찾은다음에 리턴.
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
    } catch (err) {}
};
