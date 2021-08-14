import express from "express";
import * as AuthServices from "../services/AuthServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as AuthValidation from "../validations/AuthValidation";

const Router = express.Router();

Router.post(
    "/signup",
    AuthHandler.isNotLoggedIn,
    AuthValidation.SignUpRequestValid,
    AuthServices.SingUp
);
Router.post(
    "/login",
    AuthHandler.isNotLoggedIn,
    AuthValidation.LoginRequestValid,
    AuthServices.Login
);
Router.get("/logout", AuthHandler.isLoggedIn, AuthServices.LogOut);
Router.post(
    "/nicknamecheck",
    AuthValidation.NicknameCheckRequestValid,
    AuthServices.NicknameCheck
);
Router.post(
    "/emailcheck",
    AuthValidation.EmailCheckRequestValid,
    AuthServices.EmailCheck
);
Router.get("/", AuthServices.GetUser);
Router.post(
    "/emailauth",
    AuthHandler.isNotLoggedIn,
    AuthValidation.EmailCheckRequestValid,
    AuthServices.EmailAuth
);
Router.post(
    "/authcheck",
    AuthHandler.isNotLoggedIn,
    AuthValidation.MailAuthRequestValid,
    AuthServices.AuthCheck
);

export default Router;
