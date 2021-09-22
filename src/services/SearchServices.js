import * as ChannelRepository from "../repositories/ChannelRepository";
import * as UserRepository from "../repositories/UserRepository";
import resFormat from "../utils/resFormat";

export const Search = async (req, res, next) => {
    try {
        const skipChannel = isNaN(req.query.skipChannel)
            ? 0
            : parseInt(req.query.skipChannel, 10);
        const skipUser = isNaN(req.query.skipUser)
            ? 0
            : parseInt(req.query.skipUser, 10);
        const channelData = await ChannelRepository.findByKeyword(
            req.query.category,
            req.query.keyword,
            skipChannel
        );
        if (!channelData) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 검색 실패"));
        }
        const userData = await UserRepository.findByKeyword(
            req.query.keyword,
            skipUser
        );
        if (!userData) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 검색 실패"));
        }
        const data = {
            channel: channelData,
            user: userData,
        };
        return res
            .status(200)
            .send(resFormat.successData(200, "검색 성공", data));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const SearchOnlyChannel = async (req, res, next) => {
    try {
        const skipChannel = isNaN(req.query.skipChannel)
            ? 0
            : parseInt(req.query.skipChannel, 10);
        const channelData = await ChannelRepository.findByKeyword(
            req.query.category,
            req.query.keyword,
            skipChannel
        );
        if (!channelData) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 검색 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "검색 성공", channelData));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const SearchOnlyUser = async (req, res, next) => {
    try {
        const skipUser = isNaN(req.query.skipUser)
            ? 0
            : parseInt(req.query.skipUser, 10);
        const userData = await UserRepository.findByKeyword(
            req.query.keyword,
            skipUser
        );
        if (!userData) {
            return res
                .status(500)
                .send(resFormat.fail(500, "알수 없는 에러로 검색 실패"));
        }
        return res
            .status(200)
            .send(resFormat.successData(200, "검색 성공", userData));
    } catch (err) {
        console.error(err);
        next(err);
    }
};
