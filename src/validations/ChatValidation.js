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
        .run(req);
    await check("limit").isNumeric("숫자 형태여야 합니다").run(req);

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

export const RoomLogRequestValid = async (req, res, next) => {
    await check("roomId")
        .exists()
        .withMessage("roomId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("숫자 형식이어야 합니다.")
        .run(req);
    await check("lastId")
        .exists()
        .withMessage("lastId가 존재하지 않습니다.")
        .run(req);
    await check("limit").isNumeric("숫자 형태여야 합니다").run(req);
    validationFunction(req, res, next);
};

export const RoomChatRequestValid = async (req, res, next) => {
    await check("roomId")
        .exists()
        .withMessage("roomId가 존재하지 않습니다.")
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

export const RoomAnswerChatRequestValid = async (req, res, next) => {
    await check("roomId")
        .exists()
        .withMessage("roomId가 존재하지 않습니다.")
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
    await check("answeredId")
        .isNumeric()
        .withMessage("answeredId이 숫자 형식이 아닙니다.")
        .run(req);
    validationFunction(req, res, next);
};
