import { check } from "express-validator";
import validationFunction from "./validationFunction";

//요청 단위 컨벤션 : [요청네임]ReqeustValid

export const CreateRequestValid = async (req, res, next) => {
    await check("userId")
        .notEmpty()
        .withMessage("userId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("userId에는 숫자가 들어와야 합니다.")
        .run(req);
    await check("department")
        .exists()
        .withMessage("deaprtment가 존재하지 않습니다")
        .bail()
        .isLength({ max: 20 })
        .withMessage("20자 이내 작성가능")
        .run(req);
    await check("introduce")
        .exists()
        .withMessage("introduce가 존재하지 않습니다")
        .bail()
        .isLength({ max: 300 })
        .withMessage("300자 이내 작성 가능")
        .run(req);
    await check("wellTalent")
        .exists()
        .withMessage("wellTalent가 존재하지 않습니다.")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    await check("interestTalent")
        .exists()
        .withMessage("interestTalent가 존재하지 않습니다")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    await check("src")
        .exists()
        .withMessage("src가 존재하지 않습니다.")
        .run(req);

    if (!(req.body.welltalent === null)) {
        await check("wellTalent.*")
            .trim()
            .notEmpty()
            .withMessage("값이 없습니다.")
            .isLength({ max: 10 })
            .withMessage("재능은 10자 이내로 작성해야 합니다.")
            .run(req);
    }
    if (!(req.body.interesttalent === null)) {
        await check("interestTalent.*")
            .trim()
            .notEmpty()
            .withMessage("값이 없습니다.")
            .isLength({ max: 10 })
            .withMessage("재능은 10자 이내로 작성해야 합니다.")
            .run(req);
    }
    validationFunction(req, res, next);
};

export const UpdateRequestValid = async (req, res, next) => {
    await check("nickname")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("잘못된 형식입니다.")
        .isLength({ max: 12 })
        .withMessage("닉네임은 12자 이내로 작성해야 합니다.")
        .run(req);
    CreateRequestValid(req, res, next);
};

export const GetRequestValid = async (req, res, next) => {
    await check("userId")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("userId는 숫자 형식이여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const PasswordRequestValid = async (req, res, next) => {
    await check("password")
        .matches(/^[a-zA-Z0-9가-힣]{8,}$/)
        .withMessage("비밀번호 형식에 맞지 않습니다.")
        .run(req);

    validationFunction(req, res, next);
};

export const FollowRequestValid = async (req, res, next) => {
    await check("followingId")
        .notEmpty()
        .withMessage("값이 없습니다.")
        .bail()
        .isNumeric()
        .withMessage("followingId는 숫자 형식이여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};
