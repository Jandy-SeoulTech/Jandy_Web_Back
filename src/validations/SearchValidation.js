import { query } from "express-validator";
import validationFunction from "./validationFunction";

export const SearchoRequestValid = async (req, res, next) => {
    await query("category")
        .if(query("category").exists())
        .isString()
        .withMessage("category 문자열이어야 합니다.")
        .run(req);
    await query("keyword")
        .if(query("keyword").exists())
        .isString()
        .withMessage("keyword는 문자열이어야 합니다.")
        .run(req);
    await query("skipChannel")
        .if(query("skipChannel").exists())
        .isNumeric()
        .withMessage("skipChannel은 숫자이어야합니다.")
        .run(req);
    await query("skipUser")
        .if(query("skipUser").exists())
        .isNumeric()
        .withMessage("skipUser은 숫자이어야합니다.")
        .run(req);
    validationFunction(req, res, next);
};