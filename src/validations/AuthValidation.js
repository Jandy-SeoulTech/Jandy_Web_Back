import { check } from "express-validator";
import validationFunction from "./validationFunction";
import resFormat from "../utils/resFormat";

export const SignUpRequestValid = async (req, res, next) => {
    await check("email")
        .exists()
        .withMessage("email이 없습니다.")
        .bail()
        .isEmail()
        .withMessage("형식에 맞지 않습니다.")
        .run(req);
    await check("password")
        .matches(/^[a-zA-Z0-9가-힣]{8,}$/)
        .withMessage("비밀번호 형식에 맞지 않습니다.")
        .run(req);
    await check("nickname")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("잘못된 형식입니다.")
        .isLength({ max: 12 })
        .withMessage("닉네임은 12자 이내로 작성해야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};
