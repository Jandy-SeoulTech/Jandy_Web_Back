import { check } from "express-validator";
import validationFunction from "./validationFunction";

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

export const RoomCreateRequestValid = async (req, res, next) => {
    await check("status")
        .exists()
        .withMessage("status가 존재하지 않습니다.")
        .bail()
        .isString()
        .run(req);
    await check("name").isString().run(req);
    await check("channelId").isNumeric().run(req);
    await check("postId").isNumeric().run(req);
    await check("reservedTime")
        .exists()
        .withMessage("reservedTime이 존재하지 않습니다.")
        .run(req);
    validationFunction(req, res, next);
};

export const RoomInfoRequestValid = async (req, res, next) => {
    await check("roomId")
        .exists()
        .withMessage("roomId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("roomId는 숫자 형식이여야 합니다.")
        .run(req);
    validationFunction(req, res, next);
};
