import express from "express";
import * as OAuthServices from "../services/OauthServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as OAuthHandler from "../middlewares/OAuthHandler";
const Router = express.Router();

Router.post("/google",AuthHandler.isNotLoggedIn,OAuthHandler.GoogleData, OAuthServices.OAuthLogin);
Router.post("/kakao",AuthHandler.isNotLoggedIn,OAuthHandler.KakaoData, OAuthServices.OAuthLogin);
Router.post("/naver",AuthHandler.isNotLoggedIn,OAuthHandler.NaverData, OAuthServices.OAuthLogin);

Router.post("/nickname",AuthHandler.isLoggedIn,OAuthServices.OAuthNickname);

export default Router;
