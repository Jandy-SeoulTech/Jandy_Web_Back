import express from "express";
import * as SearchValidation from "../validations/SearchValidation"
import * as SearchServices from "../services/SearchServices";
const Router = express.Router();

Router.get(
    "/",
    SearchValidation.SearchoRequestValid,
    SearchServices.Search
)

Router.get(
    "/channel",
    SearchValidation.SearchoRequestValid,
    SearchServices.SearchOnlyChannel
)

Router.get(
    "/user",
    SearchValidation.SearchoRequestValid,
    SearchServices.SearchOnlyUser
)
export default Router;