import { check, body } from "express-validator";
import validationFunction from "./validationFunction";

//email nicnname password
export const TokenRequestValid = async (req, res, next) => {
    await body("token")
        .exists()
        .withMessage("token이 존재하지 않습니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const NicknameRequestValid = async (req, res, next) => {
    await body("nickname")
        .exists()
        .withMessage("nickname이 존재하지 않습니다.")
        .bail()
        .notEmpty()
        .withMessage("nickname의 공백은 허용하지 않습니다.")
        .run(req);
    validationFunction(req, res, next);
};
