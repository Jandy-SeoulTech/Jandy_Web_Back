import express from "express";
import * as PostServices from "../services/PostServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ChannelValidation from "../validations/ChannelValidation";
import * as PostValidation from "../validations/PostValidation";

const Router = express.Router();

Router.post(
    "/",
    AuthHandler.isLoggedIn,
    PostValidation.CreateRequestValid,
    PostServices.CreatePost
);

Router.patch(
    "/:postId",
    AuthHandler.isLoggedIn,
    PostValidation.UpdateRequestValid,
    PostServices.UpdatePost
);

Router.get(
    "/:postId",
    AuthHandler.isLoggedIn,
    PostValidation.GetRequestValid,
    PostServices.GetPostInfo
);

Router.delete(
    "/:postId",
    AuthHandler.isLoggedIn,
    PostValidation.DeleteRequestValid,
    PostServices.DeletePost
);

Router.get(
    "/:channelId",
    AuthHandler.isLoggedIn,
    ChannelValidation.GetInfoRequestValid,
    PostServices.GetPostListById
);

Router.post(
    "/:postId/attention",
    AuthHandler.isLoggedIn,
    PostValidation.AttentionRequestValid,
    PostServices.BeAttention
);

Router.post(
    "/:postId/notattention",
    PostValidation.AttentionRequestValid,
    PostServices.NotAttention
);


export default Router;
