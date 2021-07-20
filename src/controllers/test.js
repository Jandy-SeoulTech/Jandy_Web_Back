import express from "express";
import * as testService from "../services/testService";

const router = express.Router();

router.get("/", testService.test);

export default router;
