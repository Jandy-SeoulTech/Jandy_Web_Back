import { body, check, validationResult } from "express-validator";
import validationFunction from "./validationFunction";
import resFormat from "../utils/resFormat";

export const testCode = [
    body("email").isEmail().withMessage("이메일 형식 불일치").bail(),
    body("name").exists().withMessage("이름 값입력 필요"),
    validationFunction,
];

//요청 단위 컨벤션 : [요청네임]ReqeustValid

export const CreateRequestValid = async (req, res, next) => {
    await check("userId")
        .notEmpty()
        .withMessage("userId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("userId에는 숫자가 들어와야 합니다.")
        .run(req);
    await check("department")
        .exists()
        .withMessage("deaprtment가 존재하지 않습니다")
        .bail()
        .isLength({ max: 20 })
        .withMessage("20자 이내 작성가능")
        .run(req);
    await check("introduce")
        .exists()
        .withMessage("introduce가 존재하지 않습니다")
        .bail()
        .isLength({ max: 300 })
        .withMessage("300자 이내 작성 가능")
        .run(req);
    await check("welltalent")
        .exists()
        .withMessage("welltalent가 존재하지 않습니다.")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    await check("interesttalent")
        .exists()
        .withMessage("interesttalent가 존재하지 않습니다")
        .if((value, { req }) => value !== null)
        .isArray()
        .withMessage("배열만 가능합니다.")
        .run(req);
    await check("src")
        .exists()
        .withMessage("src가 존재하지 않습니다.")
        .run(req);

    if (!(req.body.welltalent === null)) {
        await check("welltalent.*")
            .trim()
            .notEmpty()
            .withMessage("값이 없습니다.")
            .isLength({ max: 10 })
            .withMessage("재능은 10자 이내로 작성해야 합니다.")
            .run(req);
    }
    if (!(req.body.interesttalent === null)) {
        await check("interesttalent.*")
            .trim()
            .notEmpty()
            .withMessage("값이 없습니다.")
            .isLength({ max: 10 })
            .withMessage("재능은 10자 이내로 작성해야 합니다.")
            .run(req);
    }
    validationFunction(req, res, next);
};

export const UpdateRequestValid = async (req, res, next) => {
    await check("nickname")
        .isString()
        .withMessage("잘못된 형식입니다.")
        .isLength({ max: 12 })
        .withMessage("닉네임은 12자 이내로 작성해야 합니다.")
        .run(req);
    CreateRequestValid(req, res, next);
};
