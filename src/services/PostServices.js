import * as ChannelRepository from "../repositories/ChannelRepository";
import * as PostRepository from "../repositories/PostRepository";
import * as UserRepository from "../repositories/UserRepository";
import { dbNow } from "../utils/dayUtils";

import bcrypt from "bcrypt";

import resFormat from "../utils/resFormat";

export const CreatePost = async (req, res) => {
    try{
        const joinUser = await UserRepository.CheckJoinChannel(
            req.user.id,
            parseInt(req.body.channelId)
        );
        if (!joinUser[0]) {
            return res
                .status(401)
                .send(
                    resFormat.fail(401, "참여한 채널에만 포스트 작성이 가능합니다.")
                );
        }
        const response = await PostRepository.createPost(
            CreateOption(req.user.id,req.body)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 추방하기 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200,"포스트 작성 성공",response));
    }
    catch(err){
        console.error(err);
        next(err);
    }
}

export const UpdatePost = async (req, res) => {
    try{
        const joinUser = await UserRepository.CheckJoinChannel(
            req.user.id,
            parseInt(req.body.channelId)
        );
        if (!joinUser[0]) {
            return res
                .status(401)
                .send(
                    resFormat.fail(401, "참여한 채널에만 포스트 작성이 가능합니다.")
                );
        }
        const checkAuthor = await PostRepository.CheckMyPost(
            req.user.id,
            parseInt(req.body.postId)
        );
        if(!checkAuthor[0]){
            return res
                .status(401)
                .send(
                    resFormat.fail(401, "자신의 포스트만 수정이 가능합니다.")
                );
        }
        const response = await PostRepository.updatePost(
            UpdateOption(req.user.id,req.body)
        );
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 수정 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200,"포스트 수정 성공",response))
    }
    catch(err){
        console.error(err);
        next(err);
    }
}

export const DeletePost = async (req, res) => {
    try{
        const checkAuthor = await PostRepository.CheckMyPost(
            req.user.id,
            parseInt(req.params.postId)
        );
        if(!checkAuthor[0]){
            return res
                .status(401)
                .send(
                    resFormat.fail(401, "자신의 포스트만 삭제 가능합니다.")
                );
        }
        const response = await PostRepository.deletePost(parseInt(req.parms.postId));
        if (!response) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 삭제 실패"));
        }
        return res
            .status(200)
            .send(resFormat.success(200,"포스트 삭제 성공"))
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}

export const GetPostInfo = async (req, res) => {
    try{
        const data = await PostRepository.GetPostInfo(parseInt(req.params.postId,10));
        if(!data) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 포스트 정보 찾기 실패"));
        }
        return res
                .status(200)
                .send(resFormat.successData(200,"포스트 정보 얻기 성공",data))
    }
    catch(err){
        console.error(err);
        next(err);
    }
}

const CreateOption = (id,bodydata) => {
    // DB에 맞추어 Option 설정
    const Option = {
        author : {
            connect : {
                id
            }
        },
        status : parseInt(bodydata.status,10),
        content : bodydata.content,
        channel : {
            connect : {
                id : parseInt(bodydata.channelId,10)
            }
        },
        files: {
            create: CreateObject(bodydata.files),
        },
        createdAt: dbNow(),
    };
    return Option;
};

const UpdateOption = (bodydata) => {
    // DB에 맞추어 Option 설정
    let Option = {
        id: parseInt(bodydata.postId, 10),
        updatedAt: dbNow(),
    };
    if (bodydata.content) {
        Option.content = bodydata.content;
    }
    if (bodydata.files) {
        Option.files = {
            create: UpdateObject(bodydata.files),
        };
    }
    return Option;
};

const CreateObject = (arr) => {
    if (arr === null) return { src: null, createdAt: dbNow() };
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push({ src: v, createdAt: dbNow() });
    });
    return ArrayChange;
};

const UpdateObject = (arr) => {
    if (arr === null) return { src: null, createdAt: dbNow() };
    let ArrayChange = [];
    arr.map((v) => {
        ArrayChange.push({ src: v, createdAt: dbNow(), updatedAt: dbNow() });
    });
    return ArrayChange;
};