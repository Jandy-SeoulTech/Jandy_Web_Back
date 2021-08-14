import express from "express";
import * as ChannelServices from "../services/ChannelServices";
import * as AuthHandler from "../middlewares/AuthHandler";
const Router = express.Router();

Router.post("/",ChannelServices.CreateChannel);

export default Router;