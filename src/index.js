import express from "express";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import env from "./configs";
import passport from "passport";
import passportConfig from "./configs/passport";
import * as ErrorHandler from "./middlewares/ErrorHandler";
import Socket from "./socket";
import AuthController from "./controllers/AuthController";
import ImageController from "./controllers/ImageController";
import ProfileController from "./controllers/ProfileController";
import OAuthController from "./controllers/OAuthController";
import ChannelController from "./controllers/ChannelController";
import PostController from "./controllers/PostController";
import CommentController from "./controllers/CommentContoller";
import ChatController from "./controllers/ChatController";
import RoomController from "./controllers/RoomController";
import SearchController from "./controllers/SearchController";
import ReviewController from "./controllers/ReviewController";

const app = express();

passportConfig(passport);

if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined"));
} else {
    // development
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 받은 데이터를 req에 넣어줌.
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
    session({
        secret: env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

//router

app.use("/api/Auth", AuthController);
app.use("/api/OAuth", OAuthController);
app.use("/api/Image", ImageController);
app.use("/api/Profile", ProfileController);
app.use("/api/Channel", ChannelController);
app.use("/api/Post", PostController);
app.use("/api/Comment", CommentController);
app.use("/api/Room", RoomController);
app.use("/api/Chat", ChatController);
app.use("/api/Search", SearchController);
app.use("/api/Review", ReviewController);

//404 api handler
app.use(`/api/*`, ErrorHandler.routerHanlder);

//error loghandler
app.use(ErrorHandler.logHandler);
//errorhandler
app.use(ErrorHandler.errorHandler);

if (process.env.NODE_ENV === "production") {
    const buildDirectory = path.resolve(
        __dirname,
        "../front_build"
    );
    console.log(buildDirectory);
    app.use(express.static(buildDirectory));
    app.use((req, res, next) => {
        if (req.path.indexOf("/api") === -1) {
            return res.sendFile("index.html", { root: buildDirectory });
        }
    });
}

const server = app.listen(env.PORT, () => {
    console.log(env.PORT, "서버시작");
});

Socket(server, app);
