import express from "express";
import * as PostServices from "../services/PostServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as PostValidation from "../validation/PostValidation";
const Router = express.Router();

Roter.post('/', 
    AuthHandler.isLoggedIn,
    PostValidation.CreateRequestValid,
    PostServices.CreatePost
)

Roter.patch('/', 
    AuthHandler.isLoggedIn,
    PostValidation.UpdateRequestValid,
    PostServices.UpdatePost
)

Roter.get("/:postId",
    AuthHandler.isLoggedIn,
    PostValidation.GetRequestValid,
    PostServices.GetPostInfo
)

Roter.delete("/:postId",
    AuthHandler.isLoggedIn,
    PostValidation.DeleteRequestValid,
    PostServices.DeletePost
)
export default Router;