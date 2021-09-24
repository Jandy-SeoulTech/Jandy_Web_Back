import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ReviewValidation from "../validations/ReviewValidation";
import * as ReviewServices from "../services/ReviewServices";

const Router = express.Router();

Router.post(
    "/",
    AuthHandler.isLoggedIn,
    ReviewValidation.ReviewCreateRequestValid,
    ReviewServices.ReviewCreate
);
Router.get(
    "/list/:userId",
    AuthHandler.isLoggedIn,
    ReviewValidation.GetRequestValid,
    ReviewServices.GetReviewList
);
export default Router;
