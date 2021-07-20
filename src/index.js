import express from "express";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./configs";
import * as ErrorHandler from "./middlewares/ErrorHandler";
import TestController from "./controllers/test";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 받은 데이터를 req에 넣어줌.
app.use(cors({ origin: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
    session({
        secret: env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

//router
app.use("/test", TestController);

//404 handler
app.use(ErrorHandler.routerHanlder);

//error loghandler
app.use(ErrorHandler.logHandler);
//errorhandler
app.use(ErrorHandler.errorHandler);

app.listen(env.PORT, () => {
    console.log(env.PORT, "서버시작");
});
