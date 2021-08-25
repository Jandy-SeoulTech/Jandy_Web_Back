import { body, check } from "express-validator";
import validationFunction from "./validationFunction";
import resFormat from "../utils/resFormat";

//요청 단위 컨벤션 : [요청네임]ReqeustValid

export const ChannelLogRequestValid = async (req, res, next) => {
    await check("channelId")
        .exists()
        .withMessage("channelId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    await check("lastId")
        .exists()
        .withMessage("lastId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자형식이여아합니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const ChatRequestValid = async (req, res, next) => {
    await check("channelId")
        .exists()
        .withMessage("channelId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    await check("content")
        .exists()
        .withMessage("content가 존재하지 않습니다.")
        .bail()
        .isString()
        .withMessage("문자여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};
