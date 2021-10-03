import Multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import resFormat from "../utils/resFormat";
import { s3 } from "../configs/s3";
import env from "../configs";

const multerUpload = Multer({
    storage: multerS3({
        s3: s3,
        bucket: env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, done) => {
            const { originalname, buffer } = file;
            const ext = path.extname(originalname); //확장자 추출 (.png)
            const basename = path.basename(originalname, ext);
            const filename = basename + "_" + new Date().getTime() + ext;
            done(null, filename);
        },
    }),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5mb
    },
});

//---above , multer setting ---

export const useMulter = multerUpload;

export const SingleImageUpload = async (req, res, next) => {
    try {
        //single file
        if (!req.file) {
            return res
                .status(403)
                .send(resFormat.fail(403, "파일을 업로드해주세요"));
        }
        console.log(req.file);
        res.status(200).send(
            resFormat.successData(200, "이미지 업로드 성공", req.file.location)
        );
    } catch (err) {
        console.error(err);
        next(err);
    }
};
