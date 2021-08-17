import express from "express";
import * as OAuthServices from "../services/OauthServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as OAuthHandler from "../middlewares/OAuthHandler";
import * as OAuthValidation from "../validations/OAuthValidation";
const Router = express.Router();

Router.post(
    "/google",
    AuthHandler.isNotLoggedIn,
    OAuthValidation.TokenRequestValid,
    OAuthHandler.GoogleData, 
    OAuthServices.OAuthLogin
);
Router.post(
    "/kakao",
    AuthHandler.isNotLoggedIn,
    OAuthValidation.TokenRequestValid,
    OAuthHandler.KakaoData, 
    OAuthServices.OAuthLogin
);
Router.post(
    "/naver",
    AuthHandler.isNotLoggedIn,
    OAuthValidation.TokenRequestValid,
    OAuthHandler.NaverData, 
    OAuthServices.OAuthLogin
);

Router.post(
    "/nickname",
    AuthHandler.isLoggedIn,
    OAuthValidation.NicknameRequestValid,
    OAuthServices.OAuthNickname
);

export default Router;
