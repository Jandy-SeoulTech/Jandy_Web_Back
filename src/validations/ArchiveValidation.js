import { check, body } from "express-validator";
import validationFunction from "./validationFunction";

export const CreateRequestValid = async (req, res, next) => {
    await check("channelId")
        .notEmpty()
        .withMessage("channelId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("channelId에는 숫자가 들어와야 합니다.")
        .run(req);
    await check("postId")
        .if((value, { req }) => value !== null)
        .isNumeric()
        .withMessage("postId에는 null 값 혹은 숫자가 들어와야 합니다.")
        .run(req);
    await check("title")
        .exists()
        .withMessage("title가 존재하지 않습니다")
        .isString()
        .withMessage("title은 String 형식에 맞게 들어와야 합니다.")
        .run(req);
    await check("status")
        .exists()
        .withMessage("status가 존재하지 않습니다.")
        .bail()
        .isString()
        .withMessage("status에는 문자열이 들어와야 합니다.")
        .run(req);
    await check("content")
        .exists()
        .withMessage("content가 존재하지 않습니다")
        .isString()
        .withMessage("content 은 String 형식에 맞게 들어와야 합니다.")
        .run(req);
    await check("images")
        .exists()
        .withMessage("images가 존재하지 않습니다.")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    await check("tags")
        .exists()
        .withMessage("tags가 존재하지 않습니다.")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    if (!(req.body.images === null)) {
        await check("images.*")
            .trim()
            .notEmpty()
            .withMessage("값이 없습니다.")
            .run(req);
    }
    validationFunction(req, res, next);
};

export const DeleteRequestValid = async (req, res, next) => {
    await check("archiveId")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("archiveId는 숫자 형식이여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const UpdateRequestValid = async (req, res, next) => {
    await check("archiveId")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("archiveId는 숫자 형식이여야 합니다.")
        .run(req);
    await check("title")
        .exists()
        .withMessage("title가 존재하지 않습니다")
        .run(req);
    await check("status")
        .exists()
        .withMessage("status가 존재하지 않습니다.")
        .bail()
        .run(req);
    await check("content")
        .exists()
        .withMessage("content가 존재하지 않습니다")
        .run(req);
    await check("images")
        .exists()
        .withMessage("images가 존재하지 않습니다.")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    await check("tags")
        .exists()
        .withMessage("tags가 존재하지 않습니다.")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    if (!(req.body.images === null)) {
        await check("images.*")
            .trim()
            .notEmpty()
            .withMessage("값이 없습니다.")
            .run(req);
    }
    validationFunction(req, res, next);
};

export const GetRequestValid = async (req, res, next) => {
    await check("archiveId")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("archiveId는 숫자 형식이여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const GetByChannelRequestValid = async (req, res, next) => {
    await check("channelId")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("channelId는 숫자 형식이여야 합니다.")
        .run(req);
    await check("page")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("page는 숫자 형식이여야 합니다.")
        .run(req);
    await check("pageSize")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("pageSize는 숫자 형식이여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const GetByUserRequestValid = async (req, res, next) => {
    await check("userId")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("userId는 숫자 형식이여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const UnLikeRequestValid = async (req, res, next) => {
    await check("archiveId")
        .exists()
        .withMessage("archiveId가 존재하지 않습니다.")
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
        .if((value, { req }) => value !== null)
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    UnLikeRequestValid(req, res, next);
};
