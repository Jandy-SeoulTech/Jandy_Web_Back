import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ProfileServices from "../services/ProfileServices";
const Router = express.Router();

Router.post("/", AuthHandler.isNotLoggedIn, ProfileServices.CreateProfile);
export default Router;
