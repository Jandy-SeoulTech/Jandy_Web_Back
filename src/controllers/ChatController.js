import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ChatValidation from "../validations/ChatValidation";
import * as ChatServices from "../services/ChatServices";
const Router = express.Router();

Router.get(
    "/channel/:channelId",
    ChatValidation.ChannelLogRequestValid,
    ChatServices.MainChatLog
);

Router.post(
    "/channel/:channelId/chat",
    AuthHandler.isLoggedIn,
    ChatValidation.ChatRequestValid,
    ChatServices.MainChat
);

Router.get("/room/:roomId", ChatServices.RoomCatLog);
Router.post("/room/:roomId/chat", ChatServices.RoomCat);
export default Router;
