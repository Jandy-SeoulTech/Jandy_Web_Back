import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ProfileServices from "../services/ProfileServices";
import * as ProfileValidation from "../validations/ProfileValidation";

const Router = express.Router();

Router.post("/", AuthHandler.isNotLoggedIn, ProfileServices.CreateProfile);
Router.patch("/", AuthHandler.isLoggedIn, ProfileServices.UpdateUserProfile);
Router.get("/:userId", ProfileServices.GetUserProfile);
Router.post("/password", AuthHandler.isLoggedIn, ProfileServices.CheckPassword);
Router.patch(
    "/password",
    AuthHandler.isLoggedIn,
    ProfileServices.UpdatePassword
);
Router.post("/follow", ProfileValidation.testCode, (req, res, next) => {
    console.log(req.body);

    return res.send("ok");
});
export default Router;
