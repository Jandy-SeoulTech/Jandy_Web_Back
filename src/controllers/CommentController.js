import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as CommentValidation from "../validations/CommentValidation"
import * as CommentServices from "../services/CommentServices";

const Router = express.Router();

Router.post("/",
    AuthHandler.isLoggedIn,
    CommentValidation.CreateRequestValid,
    CommentServices.CreateComment
)

Router.patch("/",
    AuthHandler.isLoggedIn,
    CommentValidation.UpdateRequestValid,
    CommentServices.UpdateComment
)

Router.delete("/:commentId",
    AuthHandler.isLoggedIn,
    CommentValidation.DeleteRequestValid,
    CommentServices.DeleteComment
)

export default Router;