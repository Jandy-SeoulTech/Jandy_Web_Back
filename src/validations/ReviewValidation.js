import { check } from "express-validator";
import validationFunction from "./validationFunction";

export const ReviewCreateRequestValid = async (req, res, next) => {
    await check("roomId")
        .exists()
        .withMessage("roomId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("roomId는 숫자 형식이여야 합니다.")
        .run(req);
    await check("reviewedUserId")
        .isNumeric()
        .withMessage("reviewedUserId가 숫자 형식이 아닙니다.")
        .run(req);
    await check("content")
        .isString()
        .withMessage("content가 문자형식이 아닙니다.")
        .run(req);
    await check("status")
        .isString()
        .withMessage("status가 문자 형식이 아닙니다.")
        .run(req);
    validationFunction(req, res, next);
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
