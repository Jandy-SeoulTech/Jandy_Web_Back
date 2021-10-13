import { query } from "express-validator";
import validationFunction from "./validationFunction";

export const SearchoRequestValid = async (req, res, next) => {
    await query("type")
        .if(query("type").exists())
        .isIn(["channel", "user", "archive"])
        .withMessage("type값은 channel, user, archive 중에 하나입니다.")
        .run(req);
    await query("code")
        .if(query("code").exists())
        .isIn([
            "ART",
            "COOK",
            "INVEST",
            "LANGUAGE",
            "DESIGN",
            "BEAUTY",
            "PROGRAMMING",
            "STARTUP",
            "MUSIC",
            "INTERIOR",
            "EXAM",
            "SPORTS",
            "ACT",
            "PET",
            "CAREER",
            "HEALTH",
            "DANCE",
            "TRAVEL",
            "STUDY",
            "RELATIONSHIP",
            "LIFE",
            "MEDIA",
            "HOBBY",
            "ETC",
        ])
        .withMessage("정해진 카테고리 code 형식에 맞아야 합니다.")
        .run(req);
    await query("keyword")
        .if(query("keyword").exists())
        .isString()
        .withMessage("keyword는 문자열이어야 합니다.")
        .run(req);
    await query("skip")
        .if(query("skip").exists())
        .isNumeric()
        .withMessage("skip은 숫자이어야합니다.")
        .run(req);
    await query("take")
        .if(query("take").exists())
        .isNumeric()
        .withMessage("take은 숫자이어야합니다.")
        .run(req);
    validationFunction(req, res, next);
};
