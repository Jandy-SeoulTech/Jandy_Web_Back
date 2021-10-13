import * as ChannelRepository from "../repositories/ChannelRepository";
import * as UserRepository from "../repositories/UserRepository";
import * as ArchiveRepository from "../repositories/ArchiveRepository";
import resFormat from "../utils/resFormat";

export const Search = async (req, res, next) => {
    try {
        const type = req.query.type ? req.query.type : "channel";
        const keyword = req.query.keyword;
        const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0;
        const take = req.query.take ? parseInt(req.query.take, 10) : 12;
        const code = req.query.code ? req.query.code : undefined;
        if (type == "channel") {
            const response = await ChannelRepository.findByKeyword(
                code,
                keyword,
                skip,
                take
            );
            if (!response) {
                return res
                    .status(500)
                    .send(
                        resFormat.fail(500, "알수 없는 에러로 채널 검색 실패")
                    );
            }
            return res
                .status(200)
                .send(resFormat.successData(200, "채널 검색 성공", response));
        } else if (type == "user") {
            const response = await UserRepository.findByKeyword(
                keyword,
                skip,
                take
            );
            if (!response) {
                return res
                    .status(500)
                    .send(
                        resFormat.fail(500, "알수 없는 에러로 유저 검색 실패")
                    );
            }
            return res
                .status(200)
                .send(resFormat.successData(200, "유저 검색 성공", response));
        } else if (type == "archive") {
            const response = await ArchiveRepository.findByKeyword(
                keyword,
                skip,
                take
            );
            if (!response) {
                return res
                    .status(500)
                    .send(
                        resFormat.fail(
                            500,
                            "알수 없는 에러로 모아보기 검색 실패"
                        )
                    );
            }
            return res
                .status(200)
                .send(
                    resFormat.successData(200, "모아보기 검색 성공", response)
                );
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
