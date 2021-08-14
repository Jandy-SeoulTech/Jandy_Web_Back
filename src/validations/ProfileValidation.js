import { oneOf, body, validationResult, check } from "express-validator";
import validationFunction from "./validationFunction";

export const testCode = [
    body("email").isEmail().withMessage("이메일 형식 불일치").bail(),
    body("name").exists().withMessage("이름 값입력 필요"),
    validationFunction,
];
