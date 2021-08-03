import env from '../';
import * as UserRepository from "../../repositories/UserRepository";

var passport         = require('passport');
var GoogleStrategy   = require('passport-google-oauth2').Strategy;

export default (passport) =>{
    passport.use(new GoogleStrategy(
    {
        clientID      : env.clientID,
        clientSecret  : env.clientSecret,
        callbackURL   : env.callbackURL,
        passReqToCallback   : true
    },async function(request, accessToken, refreshToken, email, done){
        try {
            const exUser = await UserRepository.findByEmail(email.email);
            if(!exUser){
                const user = {
                    email: email.email,
                    provider: email.provider,
                    nickname: email.id
                };
                const result = await UserRepository.createSocial(user);
                if(!result){
                    return done(null, false, {
                        message: "소셜 계정 정보가 등록되지 않았습니다.",
                    });
                }
                return done(null,result);
            }
            const FullUser = await UserRepository.findByIdWithData(
                exUser.id
            );
            return done(null, FullUser);
        }
        catch(err){
            console.error(err);
            done(err)
        }
  }
));
}