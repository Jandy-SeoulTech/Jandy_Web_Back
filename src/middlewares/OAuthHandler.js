import axios from "axios";

export const GoogleData = async (req,res,next) =>{
    try{
        //console.log(req.body);
        const response = await axios({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
            headers:{
                "Content-Type":
                "application/x-www-form-urlencoded;charset=utf-8",
                Authorization: `Bearer ${req.body.token}`,
            }
        })
        //console.log(response.data);
        const UserData = {
            email : response.data.email,
            nickname : response.data.id,
            provider : "google",
        }
        req.UserData = UserData;
        next();
    }catch(err){
        console.log(err);
        next(err);
    }

}