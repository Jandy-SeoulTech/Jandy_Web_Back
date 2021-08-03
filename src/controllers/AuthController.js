import express from "express";
import * as AuthServices from "../services/AuthServices";
import * as AuthHandler from "../middlewares/AuthHandler";
const Router = express.Router();

Router.post("/signup", AuthHandler.isNotLoggedIn, AuthServices.SingUp);
Router.post("/login", AuthHandler.isNotLoggedIn, AuthServices.Login);
Router.get("/logout", AuthHandler.isLoggedIn, AuthServices.LogOut);
Router.post(
    "/nicknamecheck",
    AuthHandler.isNotLoggedIn,
    AuthServices.NicknameCheck
);
Router.post("/emailcheck", AuthHandler.isNotLoggedIn, AuthServices.EmailCheck);
Router.get("/", AuthServices.GetUser);
Router.post("/emailauth", AuthHandler.isNotLoggedIn, AuthServices.EmailAuth);
Router.post("/authcheck", AuthHandler.isNotLoggedIn, AuthServices.AuthCheck);
Router.get("/google",AuthServices.GoogleLogin);
Router.get("/google/callback",AuthServices.GoogleCallback,function(req,res){
    res.send("콜백함수 체크");
});
Router.post("/socialnickname",AuthHandler.isLoggedIn,AuthServices.SocialNickname);


export default Router;
