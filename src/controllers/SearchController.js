import express from "express";
import * as SearchValidation from "../validations/SearchValidation";
import * as SearchServices from "../services/SearchServices";
const Router = express.Router();

Router.get("/", SearchValidation.SearchoRequestValid, SearchServices.Search);

export default Router;
