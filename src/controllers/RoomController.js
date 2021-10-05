import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as RoomValidation from "../validations/RoomValidation";
import * as RoomService from "../services/RoomServices";

const Router = express.Router();

Router.post(
    "/",
    AuthHandler.isLoggedIn,
    RoomValidation.RoomCreateRequestValid,
    RoomService.RoomCreate
);
Router.get("/list", AuthHandler.isLoggedIn, RoomService.GetOwnerRoomList);

Router.get(
    "/:channelId",
    AuthHandler.isLoggedIn,
    RoomValidation.GetInfoRequestValid,
    RoomService.GetChannelRoomList
);
Router.patch(
    "/exit",
    AuthHandler.isLoggedIn,
    RoomValidation.RoomInfoRequestValid,
    RoomService.RoomExit
);
Router.patch(
    "/close",
    AuthHandler.isLoggedIn,
    RoomValidation.RoomInfoRequestValid,
    RoomService.RoomClose
);

Router.get(
    "/info/:roomId",
    AuthHandler.isLoggedIn,
    RoomValidation.RoomInfoRequestValid,
    RoomService.GetRoomInfo
);

Router.post("/test/join", AuthHandler.isLoggedIn, RoomService.join);
Router.post("/test/list", RoomService.list);
export default Router;
