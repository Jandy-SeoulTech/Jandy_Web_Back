import * as ChannelRepository from "../repositories/ChannelRepository";
import * as UserRepository from "../repositories/UserRepository";
import resFormat from "../utils/resFormat";

export const Search = async (req, res, next) => {
    try{
        console.log(req.query);
        /*const channelData = await ChannelRepository.findByKeyword(req.query.category, req.query.keyword, req.query.lastId);
        if (!channelData) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 검색 실패"));
        }*/
        const userData = await UserRepository.findByKeyword(req.query.keyword,req.query.lastId);
        if (!userData) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 검색 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200,"검색 성공",userData));
    }
    catch (err) {
        console.error(err);
    }
}