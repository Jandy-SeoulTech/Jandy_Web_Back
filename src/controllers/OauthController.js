import express from "express";
import * as OAuthServices from "../services/OAuthServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as OAuthHandler from "../middlewares/OAuthHandler";
const Router = express.Router();

Router.post("/google",AuthHandler.isNotLoggedIn,OAuthHandler.GoogleData, OAuthServices.GoogleLogin);

Router.post("/google/nickname",AuthHandler.isLoggedIn,OAuthServices.GoogleNickname);

export default Router;