import { validationResult } from "express-validator";
import resFormat from "../utils/resFormat";

export default (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty())
        return res
            .status(400)
            .send(
                resFormat.failData(
                    400,
                    "Request Data validation fail",
                    error.errors
                )
            );
    next();
};
