import * as ChannelRepository from "../repositories/ChannelRepository";
import bcrypt from "bcrypt";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
import resFormat from "../utils/resFormat";

export const CreateChannel = async (req,res,next) => {
    try{
        if (!(parseInt(req.body.userId, 10) === req.user.id)) {
            return res
                .status(401)
                .send(resFormat.fail(401, "본인소유의 채널만 생성 가능"));
        }
        const response = await ChannelRepository.createChannel(
            MakeOption(req.body,req.body.tag)
        )
        //console.log(response);
        
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "채널 생성 실패"));
        }
        const data = await ChannelRepository.findById(response.id);
        return res.status(200).send(
                resFormat.successData(200,"채널 생성 성공", data)
        )
    }catch(err){
        console.error(err);
        next(err);
    }
}

export const GetChannelList = async (req,res,next) => {
    try{
        const data = await ChannelRepository.findManyByUserid(parseInt(req.params.userId,10));
        if(!data){
            return res
                    .status(403)
                    .send(resFormat.fail(403, "채널이 존재 하지 않습니다."));
        }
        return res
                .status(200)
                . send(resFormat.successData(200,"채널 목록 가져오기 성공",data))
    }catch(err){
        console.error(err);
        next(err);
    }
}

export const GetChannelInfo = async (req,res,nex) => {
    try{
        const data = await ChannelRepository.findById(parseInt(req.params.channelId),10);
        if(!data){
            return res
                    .status(403)
                    .send(resFormat.fail(403, "채널이 존재 하지 않습니다."));
        }
        return res
                .status(200)
                . send(resFormat.successData(200,"채널 목록 가져오기 성공",data))
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