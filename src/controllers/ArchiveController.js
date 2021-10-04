import express from "express";
import * as ArchiveServices from "../services/ArchiveServices";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ArchiveValidation from "../validations/ArchiveValidation";

const Router = express.Router();

Router.post(
    "/",
    AuthHandler.isLoggedIn,
    ArchiveValidation.CreateRequestValid,
    ArchiveServices.CreateArchive,
);

Router.delete(
    "/:archiveId",
    AuthHandler.isLoggedIn,
    ArchiveValidation.DeleteRequestValid,
    ArchiveServices.DeleteArchive,
);

Router.patch(
    "/:archiveId",
    AuthHandler.isLoggedIn,
    ArchiveValidation.UpdateRequestValid,
    ArchiveServices.UpdateArchive,
);

// Test용 조회
Router.get(
    "/:archiveId",
    ArchiveServices.GetArchive,
);
export default Router;
