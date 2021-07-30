import * as UserRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import passport from "passport";
import resFormat from "../utils/resFormat";

export const SingUp = async (req, res, next) => {
    try {
        //nickname, email, password
        const exUser = await UserRepository.findByEmail(req.body.email);
        if (exUser) {
            return res
                .status(403)
                .send(resFormat.fail(403, "이미 가입된 회원입니다."));
        } else {
            req.body.password = await bcrypt.hash(req.body.password, 12);
            const response = await UserRepository.createLocal(req.body);
            return res
                .status(200)
                .send(resFormat.success(200, "회원가입 성공"));
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const Login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).send(resFormat.fail(401, info.message));
        }
        req.login(user, (err) => {
            if (err) {
                //passport login 실행단계
                console.error(err);
                next(err);
            }
            return res
                .status(200)
                .send(resFormat.successData(200, "로그인성공", user));
        });
    })(req, res, next);
};

export const LogOut = (req, res, next) => {
    req.logOut();
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            next(err);
        } else {
            res.clearCookie("connect.sid");
            res.status(200).send(resFormat.success(200, "로그아웃 성공"));
        }
    });
};
