import * as ChannelRepository from "../repositories/ChannelRepository";
import bcrypt from "bcrypt";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
import resFormat from "../utils/resFormat";

export const CreateChannel = async (req,res,next) => {
    try{

        // Tag string 값 배열로 변환
        const TagArray = req.body.tag.split(",");
        
        const response = await ChannelRepository.createChannel(
            MakeOption(req.body,TagArray,"create")
        )
        console.log(response);

        return res.status(200).send(
                resFormat.successData(200,"채널 생성 성공", response)
        )
    }catch(err){
        console.error(err);
        next(err);
    }

}

// Option 생성
const MakeOption = (bodydata, TagArray) => {
    // DB에 맞추어 Option 설정

    const Option = {
        adminId : parseInt(bodydata.userId,10),
        name  : bodydata.name,
        introduce : bodydata.introduce,
        tags : {
            create : ChangeObject(TagArray),
        },
        category : {
            create: 
                { 
                    category: {
                        create : {
                            name : bodydata.category,
                            createdAt : now
                        },
                    },
                    createdAt : now,
                }, 
        },
        channelImage: {
            create : {
                src : bodydata.src,
                createdAt: now
            }
        },
        createdAt : now
    };
    return Option;
}

const ChangeObject = (arr) => {
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push( {tag : {create : { name: v, createdAt: now }}, createdAt : now});
    });
    return ArrayChange;
};