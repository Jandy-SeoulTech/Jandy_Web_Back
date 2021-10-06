import express from "express";
import * as ArchiveServices from "../services/ArchiveServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ArchiveValidation from "../validations/ArchiveValidation";

const Router = express.Router();

Router.post(
    "/",
    AuthHandler.isLoggedIn,
    ArchiveValidation.CreateRequestValid,
    ArchiveServices.CreateArchive
);

Router.delete(
    "/:archiveId",
    AuthHandler.isLoggedIn,
    ArchiveValidation.DeleteRequestValid,
    ArchiveServices.DeleteArchive
);

Router.patch(
    "/:archiveId",
    AuthHandler.isLoggedIn,
    ArchiveValidation.UpdateRequestValid,
    ArchiveServices.UpdateArchive
);

Router.get(
    "/:archiveId",
    AuthHandler.isLoggedIn,
    ArchiveValidation.GetRequestValid,
    ArchiveServices.GetArchive
);

Router.get(
    "/channel/:channelId",
    AuthHandler.isLoggedIn,
    ArchiveValidation.GetByChannelRequestValid,
    ArchiveServices.GetChannelArchiveList
);

Router.get(
    "/profile/:userId",
    AuthHandler.isLoggedIn,
    ArchiveValidation.GetByUserRequestValid,
    ArchiveServices.GetUserArchiveList
);

Router.post(
    "/like",
    AuthHandler.isLoggedIn,
    ArchiveValidation.LikeRequestValid,
    ArchiveServices.LikeArchive
);
Router.post(
    "/unlike",
    AuthHandler.isLoggedIn,
    ArchiveValidation.UnLikeRequestValid,
    ArchiveServices.UnLikeArchive
);

export default Router;
