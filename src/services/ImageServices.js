import multer from "multer";
import path from "path";
import fs from "fs";
import resFormat from "../utils/resFormat";

try {
    fs.accessSync("uploads");
} catch (err) {
    console.log("uploads 폴더가 없으므로 생성");
    fs.mkdirSync("uploads");
}

const multerUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads");
        },
        filename(req, file, done) {
            console.log(file);

            const ext = path.extname(file.originalname); // 확장자 추출(.png..)
            const basename = path.basename(file.originalname, ext); //이름 가져오기.

            done(null, basename + "_" + new Date().getTime() + ext); // 파일 이름 + 날짜 + 확장자
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 파일 크기 20MB 제한
});

export const upload = multerUpload;

export const ProfileUpload = (req, res, next) => {
    try {
        console.log(req.files);
        res.status(200).send(
            resFormat.successData(
                200,
                "이미지 업로드 성공",
                req.files.map((v) => v.filename)
            )
        );
    } catch (err) {
        console.error(err);
        next(err);
    }
};
