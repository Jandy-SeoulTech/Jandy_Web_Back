import { body, check } from "express-validator";
import validationFunction from "./validationFunction";

export const testCode = [
    body("email").isEmail().withMessage("이메일 형식 불일치").bail(),
    body("name").exists().withMessage("이름 값입력 필요"),
    validationFunction,
];

export const CreateRequestValid = [
    check("userId")
        .exists()
        .withMessage("userId가 존재하지 않습니다.")
        .bail()
        .isNumeric()
        .withMessage("userId에는 숫자가 들어와야 합니다."),
    check("department")
        .exists()
        .withMessage("deaprtment가 존재하지 않습니다")
        .bail(),
    check("introduce")
        .exists()
        .withMessage("introduce가 존재하지 않습니다")
        .bail(),
    check("welltalent")
        .exists()
        .withMessage("welltalent가 존재하지 않습니다.")
        .bail(),
    check("interesttalent")
        .exists()
        .withMessage("interesttalent가 존재하지 않습니다")
        .bail(),
    check("src").exists().withMessage("src가 존재하지 않습니다.").bail(),
    validationFunction,
];
