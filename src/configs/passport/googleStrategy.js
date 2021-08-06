import passportCustom from "passport-custom";
import * as UserRepository from "../../repositories/UserRepository";

const CustomStrategy   = passportCustom.Strategy;

export default (passport) =>{
    passport.use("use-google",
        new CustomStrategy(async (req,done) => {
            try{
                //console.log(req.UserData);
                const exUser = await UserRepository.findByEmail(
                    req.UserData.email
                );
                if(exUser){
                    return done(null, exUser, {messsage : 'User 정보 존재'} );
                }
                const user = await UserRepository.createSocial(req.UserData);
                return done(null,user);
            }catch(err){
                console.error(err);
                return done(err);
            }
        })
    );
}