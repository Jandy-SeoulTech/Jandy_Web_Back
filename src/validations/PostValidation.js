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
    await check("files")
        .exists()
        .withMessage("files가 존재하지 않습니다.")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    if (!(req.body.files === null)) {
        await check("files.*")
            .trim()
            .notEmpty()
            .withMessage("값이 없습니다.")
            .run(req);
    }
    validationFunction(req, res, next);
};

export const UpdateRequestValid = async (req, res, next) => {
    await check("postId")
        .notEmpty()
        .withMessage("postId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("postId에는 숫자가 들어와야 합니다.")
        .run(req);
    CreateRequestValid(req,res,next);
}

export const GetRequestValid = async (req, res, next) => {
    await check("postId")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("postId는 숫자 형식이여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const DeleteRequestValid = async (req, res, next) => {
    GetRequestValid(req, res, next);
}