import { body, check } from "express-validator";
import validationFunction from "./validationFunction";
import resFormat from "../utils/resFormat";

//요청 단위 컨벤션 : [요청네임]ReqeustValid

export const CreateRequestValid = async (req, res, next) => {
    await check("userId")
        .notEmpty()
        .withMessage("userId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("userId에는 숫자가 들어와야 합니다.")
        .run(req);
    await check("name")
        .exists()
        .withMessage("name 존재하지 않습니다")
        .isString()
        .withMessage("name은 String 형식에 맞게 들어와야 합니다.")
        .bail()
        .isLength({ max: 20 })
        .withMessage("20자 이내 작성 가능")
        .run(req);
    await check("introduce")
        .exists()
        .withMessage("introduce가 존재하지 않습니다")
        .bail()
        .isString()
        .withMessage("introduce는 String 형식에 맞게 들어와야 합니다.")
        .bail()
        .isLength({ max: 500 })
        .withMessage("500자 이내 작성 가능")
        .run(req);
    await check("category")
        .exists()
        .withMessage("category가 존재하지 않습니다")
        .bail()
        .isString()
        .withMessage("category는 String 형식에 맞게 들어와야 합니다.")
        .run(req);
    await check("tags")
        .exists()
        .withMessage("tags가 존재하지 않습니다.")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    await check("src")
        .exists()
        .withMessage("src가 존재하지 않습니다.")
        .run(req);

    if (!(req.body.tags === null)) {
        await check("tags.*")
            .trim()
            .notEmpty()
            .withMessage("값이 없습니다.")
            .isLength({ max: 10 })
            .withMessage("tag는 10자 이내로 작성해야 합니다.")
            .run(req);
    }
    validationFunction(req, res, next);
};

export const UpdateRequestValid = async (req, res, next) => {
    await check("channelId")
        .exists()
        .withMessage("channelId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    CreateRequestValid(req, res, next);
};

export const GetListRequestValid = async (req, res, next) => {
    await check("userId")
        .exists()
        .withMessage("userId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const GetInfoRequestValid = async (req, res, next) => {
    await check("channelId")
        .exists()
        .withMessage("channelId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const LikeRequestValid = async (req, res, next) => {
    await check("channelId")
        .exists()
        .withMessage("channelId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const EnterRequestValid = async (req, res, next) => {
    await check("channelId")
        .exists()
        .withMessage("channelId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const ManageRequestValid = async (req, res, next) => {
    await check("channelId")
        .exists()
        .withMessage("channelId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    await check("adminId")
        .exists()
        .withMessage("adminId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    await check("userId")
        .exists()
        .withMessage("userId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};
