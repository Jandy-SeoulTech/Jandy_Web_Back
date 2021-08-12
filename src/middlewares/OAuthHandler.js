import axios from "axios";

export const GoogleData = async (req, res, next) => {
    try {
        //console.log(req.body);
        const response = await axios({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                Authorization: `Bearer ${req.body.token}`,
            },
        });
        //console.log(response.data);
        const UserData = {
            email: response.data.email,
            provider: "google",
        };
        req.UserData = UserData;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const KakaoData = async (req, res, next) => {
    try {
        //console.log(req.body);
        const response = await axios({
            url: "https://kapi.kakao.com/v2/user/me",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                Authorization: `Bearer ${req.body.token}`,
            },
        });
        console.log(response.data);
        const UserData = {
            email: response.data.kakao_account.email,
            provider: "kakao",
        };
        req.UserData = UserData;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const NaverData = async (req, res, next) => {
    try {
        //console.log(req.body);
        const response = await axios({
            url: "https://openapi.naver.com/v1/nid/me",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                Authorization: `Bearer ${req.body.token}`,
            },
        });
        //console.log(response.response);
        const UserData = {
            email: response.data.response.email,
            provider: "naver",
        };
        req.UserData = UserData;
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};
