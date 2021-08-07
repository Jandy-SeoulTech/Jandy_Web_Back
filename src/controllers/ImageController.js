import express from "express";
import * as AuthHandler from "../middlewares/AuthHandler";
import * as ImageServices from "../services/ImageServices";

const Router = express.Router();

Router.post(
    "/upload",
    ImageServices.upload.array("files"),
    ImageServices.ProfileUpload
);

export default Router;
