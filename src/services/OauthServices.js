import * as UserRepository from "../repositories/UserRepository";
import passport from "passport";
import resFormat from "../utils/resFormat";

export const GoogleLogin = (req,res, next)=>{
    passport.authenticate('google', { scope: ['email']})(req,res,next);
}

export const GoogleCallback = (req,res,next) => {
    passport.authenticate('google',(err, user, info) => {
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
}

export const GoogleNickname = async (req, res, next) => {
    try {
        const exUser = await UserRepository.findByEmail(req.user.email);
        if (!exUser) {
            return res
                .status(403)
                .send(resFormat.fail(403, "등록되지 않은 소셜 회원입니다."));
        } else {
            const data= {
                id: exUser.id,
                nickname: req.body.nickname
            }
            const result = await UserRepository.updateNickname(data);
            return res
                .status(200)
                .send(resFormat.success(200, "닉네임 등록 성공"));
        }
    } catch (err) {
        console.error(err);
        next(err);
    }

};