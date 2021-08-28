import express from "express";
import * as PostServices from "../services/PostServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as PostValidation from "../validations/PostValidation";
import * as ChannelValidation from "../validations/ChannelValidation";

const Router = express.Router();

Router.post('/', 
    AuthHandler.isLoggedIn,
    PostValidation.CreateRequestValid,
    PostServices.CreatePost
)

Router.patch('/', 
    AuthHandler.isLoggedIn,
    PostValidation.UpdateRequestValid,
    PostServices.UpdatePost
)

Router.get("/info/:postId",
    AuthHandler.isLoggedIn,
    PostValidation.GetRequestValid,
    PostServices.GetPostInfo
)

Router.delete("/:postId",
    AuthHandler.isLoggedIn,
    PostValidation.DeleteRequestValid,
    PostServices.DeletePost
)

Router.get("/:channelId",
    AuthHandler.isLoggedIn,
    ChannelValidation.GetInfoRequestValid,
    PostServices.GetPostListById
)
export default Router;