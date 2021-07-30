import resFormat from "../utils/resFormat";

export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send(resFormat.fail(403, "로그인이 필요합니다."));
    }
};

export const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send(resFormat.fail(403, "이미 로그인된 유저입니다."));
    }
};
