import express from "express";
import * as AuthServices from "../services/AuthServices";
import * as AuthHandler from "../middlewares/AuthHandler";
const Router = express.Router();

Router.post("/signup", AuthHandler.isNotLoggedIn, AuthServices.SingUp);
Router.post("/login", AuthHandler.isNotLoggedIn, AuthServices.Login);
Router.get("/logout", AuthHandler.isLoggedIn, AuthServices.LogOut);

export default Router;
