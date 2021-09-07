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
Router.get(
    "/:channelId",
    AuthHandler.isLoggedIn,
    RoomValidation.GetInfoRequestValid,
    RoomService.GetRoomList
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
Router.post(
    "/review",
    AuthHandler.isLoggedIn,
    RoomValidation.ReviewRequestValid,
    RoomService.Review
);
Router.get(
    "/info/:roomId",
    AuthHandler.isLoggedIn,
    RoomValidation.RoomInfoRequestValid,
    RoomService.GetRoomInfo
);

Router.post("/join", AuthHandler.isLoggedIn, RoomService.join);
Router.post("/list", RoomService.list);
export default Router;
