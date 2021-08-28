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
        .notEmpty()
        .withMessage("postId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("postId에는 숫자가 들어와야 합니다.")
        .run(req);
    await check("content")
        .exists()
        .withMessage("content가 존재하지 않습니다")
        .isString()
        .withMessage("content 은 String 형식에 맞게 들어와야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const UpdateRequestValid = async (req, res, next) => {
    await check("commentId")
        .notEmpty()
        .withMessage("commentId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("commentId에는 숫자가 들어와야 합니다.")
        .run(req);
    CreateRequestValid(req,res,next);
}

export const DeleteRequestValid = async (req, res, next) => {
    await check("commentId")
        .notEmpty()
        .withMessage("값이 없습니다")
        .isNumeric()
        .withMessage("postId는 숫자 형식이여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
}