import { check } from "express-validator";
import validationFunction from "./validationFunction";

//email nicnname password
export const SignUpRequestValid = async (req, res, next) => {
    await check("nickname")
        .trim()
        .notEmpty()
        .isString()
        .withMessage("잘못된 형식입니다.")
        .isLength({ max: 12 })
        .withMessage("닉네임은 12자 이내로 작성해야 합니다.")
        .run(req);
    LoginRequestValid(req, res, next);
};

//email password
export const LoginRequestValid = async (req, res, next) => {
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
    validationFunction(req, res, next);
};

export const NicknameCheckRequestValid = async (req, res, next) => {
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

export const EmailCheckRequestValid = async (req, res, next) => {
    await check("email")
        .exists()
        .withMessage("email이 없습니다.")
        .bail()
        .isEmail()
        .withMessage("형식에 맞지 않습니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const MailAuthRequestValid = async (req, res, next) => {
    await check("auth")
        .exists()
        .withMessage("필요값이 없습니다.")
        .bail()
        .notEmpty()
        .withMessage("공백허용하지 않습니다.")
        .run(req);
    EmailCheckRequestValid(req, res, next);
};
