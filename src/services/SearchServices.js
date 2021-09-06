import * as ChannelRepository from "../repositories/ChannelRepository";
import * as UserRepository from "../repositories/UserRepository";
import resFormat from "../utils/resFormat";

export const Search = async (req, res, next) => {
    try{
        req.query.skipChannel = req.query.skipChannel != '' ? parseInt(req.query.skipChannel, 10) : 0;
        req.query.skipUser = req.query.skipUser != '' ? parseInt(req.query.skipUser) : 0;
        const channelData = await ChannelRepository.findByKeyword(req.query.category, req.query.keyword, parseInt(req.query.skipChannel,10) || 0);
        if (!channelData) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 검색 실패"));
        }
        const userData = await UserRepository.findByKeyword(req.query.keyword, parseInt(req.query.skipUser,10));
        if (!userData) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 검색 실패"));
        }
        const data = {
            channel : channelData,
            user : userData,
        }
        return res
            .status(200)
            .send(resFormat.successData(200,"검색 성공",data));
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}