import * as UserRepository from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import passport from "passport";
import resFormat from "../utils/resFormat";
import nodemailer from "nodemailer";

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

export const NicknameCheck = async (req, res, next) => {
    try {
        const exUser = await UserRepository.findByNickname(req.body.nickname);
        if (exUser) {
            return res
                .status(403)
                .send(resFormat.fail(403, "중복된 닉네임입니다"));
        }
        return res
            .status(200)
            .send(resFormat.success(200, "사용가능한 닉네임입니다."));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const EmailCheck = async (req, res, next) => {
    try {
        const exUser = await UserRepository.findByEmail(req.body.email);
        if (exUser) {
            return res
                .status(403)
                .send(resFormat.fail(403, "중복된 이메일입니다"));
        }
        return res
            .status(200)
            .send(resFormat.success(200, "사용가능한 이메일입니다."));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const GetUser = async (req, res, next) => {
    try {
        if (req.user) {
            const user = await UserRepository.findByIdWithData(req.user.id);
            return res
                .status(200)
                .send(resFormat.successData(200, "유저 정보 확인 성공", user));
        } else {
            return res
                .status(401)
                .json(resFormat.fail(401, "유저 정보 확인 실패"));
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const EmailAuth = async (req,res,next) => {
    try{
        const RandomCode = () => {
            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'
            const stringLength = 6
            let randomstring = ''
            for (let i = 0; i < stringLength; i++) {
              const rnum = Math.floor(Math.random() * chars.length)
              randomstring += chars.substring(rnum, rnum + 1)
            }
            return randomstring
          }
        const RandomAuth = RandomCode()
        const mailConfig = {
            service: 'Naver',
            host: 'smtp.naver.com',
            port: 587,
            auth: {
              user: process.env.MAIL_EMAIL,
              pass: process.env.MAIL_PASSWORD
            }
          }
        let message = {
            from: process.env.MAIL_EMAIL,
            to: req.body.email,
            subject: '이메일 인증 요청 메일입니다.',
            html: `<p> 다음 인증번호 6자리를 입력해주세요! <br> ${RandomAuth} </p>`
        }
        let transporter = nodemailer.createTransport(mailConfig)
        let info = await transporter.sendMail(message)
        console.log('Message sent: %s', info.messageId);

        if(info){
                return res
                    .status(200)
                    .send(resFormat.successData(200, "인증번호 보내기 성공", info))
            }
        else{
            return res
                .status(401)
                .json(resFormat.fail(401, "인증번호 보내기 실패"));
        }    
    }
    catch(err){
        console.error(err);
        next(err);
    }
}