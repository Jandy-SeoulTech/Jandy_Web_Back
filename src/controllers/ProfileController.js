import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ProfileServices from "../services/ProfileServices";
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

export default Router;
