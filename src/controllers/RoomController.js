import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as RoomValidation from "../validations/RoomValidation";
import * as RoomService from "../services/RoomServices";

const Router = express.Router();

Router.post(
    "/room",
    AuthHandler.isLoggedIn,
    RoomValidation.RoomCreateRequestValid,
    RoomService.RoomCreate
);
Router.get(
    "/room/:channelId",
    AuthHandler.isLoggedIn,
    RoomValidation.GetInfoRequestValid,
    RoomService.GetRoomList
);

export default Router;
