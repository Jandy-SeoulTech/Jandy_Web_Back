import express from "express";
import * as ChannelServices from "../services/ChannelServices";
import * as PostServices from "../services/PostServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ChannelValidation from "../validations/ChannelValidation";
import * as PostValidation from "../validations/PostValidation";
import * as CommentValidation from "../validations/CommentValidation";
import * as CommentServices from "../services/CommentServices";
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
Router.post(
    "/like",
    AuthHandler.isLoggedIn,
    ChannelValidation.LikeRequestValid,
    ChannelServices.LikeChannel
);
Router.post(
    "/unlike",
    AuthHandler.isLoggedIn,
    ChannelValidation.LikeRequestValid,
    ChannelServices.UnLikeChannel
);

Router.post(
    "/enter",
    AuthHandler.isLoggedIn,
    ChannelValidation.EnterRequestValid,
    ChannelServices.EnterChannel
);

Router.post(
    "/exit",
    AuthHandler.isLoggedIn,
    ChannelValidation.EnterRequestValid,
    ChannelServices.ExitChannel
);

Router.post(
    "/pass",
    AuthHandler.isLoggedIn,
    ChannelValidation.ManageRequestValid,
    ChannelServices.ChangeAdmin
);

Router.post(
    "/ban",
    AuthHandler.isLoggedIn,
    ChannelValidation.ManageRequestValid,
    ChannelServices.Ban
);

export default Router;
