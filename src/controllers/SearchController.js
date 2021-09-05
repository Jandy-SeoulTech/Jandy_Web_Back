import express from "express";
import * as SearchServices from "../services/SearchServices";
const Router = express.Router();

Router.get(
    "/",
    SearchServices.Search
)
export default Router;