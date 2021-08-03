import express from "express";
import * as AuthServices from "../services/OauthServices";
import * as AuthHandler from "../middlewares/AuthHandler";
const Router = express.Router();

Router.get("/google",AuthServices.GoogleLogin);
Router.get("/google/callback",AuthServices.GoogleCallback,function(req,res){
    res.send("콜백함수 체크");
});
Router.post("/google/nickname",AuthHandler.isLoggedIn,AuthServices.GoogleNickname);

export default Router;