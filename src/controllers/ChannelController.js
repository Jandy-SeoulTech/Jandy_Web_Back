import express from "express";
import * as ChannelServices from "../services/ChannelServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ChannelValidation from "../validations/ChannelValidation";
const Router = express.Router();

Router.post(
    "/",
    AuthHandler.isLoggedIn,
    ChannelValidation.CreateRequestValid,
    ChannelServices.CreateChannel
);
Router.get(
    "/:userId",
    ChannelValidation.GetListRequestValid,
    ChannelServices.GetChannelList
);
Router.get(
    "/info/:channelId",
    ChannelValidation.GetInfoRequestValid,
    ChannelServices.GetChannelInfo
);
Router.patch(
    "/",
    AuthHandler.isLoggedIn,
    ChannelValidation.UpdateRequestValid, 
    ChannelServices.UpdateChannel
);

export default Router;