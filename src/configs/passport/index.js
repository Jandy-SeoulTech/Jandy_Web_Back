import local from "./localStrategy";
import * as UserRepository from "../../repositories/UserRepository";

export default (passport) => {
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user);
    });
    passport.deserializeUser(async (user, done) => {
        //DB접근
        try {
            const finduser = await UserRepository.findById(user.id);
            done(null, finduser);
        } catch (err) {
            console.error(err);
            done(err);
        }
    });
    local(passport);
    //Strategy list..
};
