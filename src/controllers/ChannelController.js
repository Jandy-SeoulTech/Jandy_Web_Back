import express from "express";
import * as ChannelServices from "../services/ChannelServices";
import * as PostServices from "../services/PostServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ChannelValidation from "../validations/ChannelValidation";
import * as PostValidation from "../validations/PostValidation";
import * as CommentValidation from "../validations/CommentValidation"
import * as CommentServices from "../services/CommentServices";
const Router = express.Router();

Router.post(
    "/",
    AuthHandler.isLoggedIn,
    ChannelValidation.CreateRequestValid,
    ChannelServices.CreateChannel
);
Router.get(
    "/mychannel",
    AuthHandler.isLoggedIn,
    ChannelServices.GetMyChannelInfo
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

Router.post(
    '/:channelId/post',
    AuthHandler.isLoggedIn,
    PostValidation.CreateRequestValid,
    PostServices.CreatePost
);

Router.patch(
    '/:channelId/post', 
    AuthHandler.isLoggedIn,
    PostValidation.UpdateRequestValid,
    PostServices.UpdatePost
);

Router.get(
    "/:channelId/post/:postId",
    AuthHandler.isLoggedIn,
    PostValidation.GetRequestValid,
    PostServices.GetPostInfo
);

Router.delete(
    "/:channelId/post/:postId",
    AuthHandler.isLoggedIn,
    PostValidation.DeleteRequestValid,
    PostServices.DeletePost
);

Router.get(
    "/:channelId/post",
    AuthHandler.isLoggedIn,
    ChannelValidation.GetInfoRequestValid,
    PostServices.GetPostListById
);

Router.post(
    "/:channelId/post/:postId/comment",
    AuthHandler.isLoggedIn,
    CommentValidation.CreateRequestValid,
    CommentServices.CreateComment
)

Router.patch(
    "/:channelId/post/:postId/comment",
    AuthHandler.isLoggedIn,
    CommentValidation.UpdateRequestValid,
    CommentServices.UpdateComment
)

Router.delete(
    "/:channelId/post/:postId/comment/:commentId",
    AuthHandler.isLoggedIn,
    CommentValidation.DeleteRequestValid,
    CommentServices.DeleteComment
)

export default Router;
