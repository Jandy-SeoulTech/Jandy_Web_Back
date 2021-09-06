import { check } from "express-validator";
import validationFunction from "./validationFunction";

export const SearchoRequestValid = async (req, res, next) => {
    await check("category")
        .isString()
        .withMessage("category 문자열이어야 합니다.")
        .run(req);
    await check("keyword")
        .isString()
        .withMessage("keyword는 문자열이어야 합니다.")
        .run(req);
    await check("skipChannel")
        .if((value, { req }) => value !== '')
        .isNumeric()
        .withMessage("skipChannel은 숫자이어야합니다.")
        .run(req);
    await check("skipUser")
        .if((value, { req }) => value !== '')
        .isNumeric()
        .withMessage("skipUser은 숫자이어야합니다.")
        .run(req);
    validationFunction(req, res, next);
};