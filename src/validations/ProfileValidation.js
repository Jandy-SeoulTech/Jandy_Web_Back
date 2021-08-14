import { body, check } from "express-validator";
import validationFunction from "./validationFunction";

export const testCode = [
    body("email").isEmail().withMessage("이메일 형식 불일치").bail(),
    body("name").exists().withMessage("이름 값입력 필요"),
    validationFunction,
];

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
        .run(req);
    await check("interesttalent")
        .exists()
        .withMessage("interesttalent가 존재하지 않습니다")
        .run(req);
    await check("src")
        .exists()
        .withMessage("src가 존재하지 않습니다.")
        .run(req);

    if (!(req.body.welltalent === null)) {
        await check("welltalent")
            .isArray()
            .withMessage("배열만 가능합니다.")
            .notEmpty()
            .withMessage("값이 없습니다.")
            .run(req);
        await check("welltalent.*")
            .trim()
            .notEmpty()
            .withMessage("값이 없습니다.")
            .isLength({ max: 10 })
            .withMessage("재능은 10자 이내로 작성해야 합니다.")
            .run(req);
    }
    if (!(req.body.interesttalent === null)) {
        await check("interesttalent")
            .isArray()
            .withMessage("배열만 가능합니다")
            .notEmpty()
            .withMessage("값이 없습니다.")
            .run(req);
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
