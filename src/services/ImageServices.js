import Multer from "multer";
import { format } from "util";
import path from "path";
import fs from "fs";
import resFormat from "../utils/resFormat";
import { Storage } from "@google-cloud/storage";
import env from "../configs";

const serviceKey = path.join(__dirname, "/../../../jandyGCPkeys.json");

const GCPstorage = new Storage({
    keyFilename: serviceKey,
    projectId: env.GCLOUD_PROJECT_ID,
});

const multerUpload = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5mb
    },
});

const bucket = GCPstorage.bucket(env.GCLOUD_STORAGE_BUCKET);

//---above , multer setting ---

export const useMulter = multerUpload;

//custom image code
const uploadIamge = (file) =>
    new Promise((resolve, reject) => {
        const { originalname, buffer } = file;
        const ext = path.extname(originalname); //확장자 추출 (.png)
        const basename = path.basename(originalname, ext);
        const filename = basename + "_" + new Date().getTime() + ext;

        const blob = bucket.file(filename);
        const blobStream = blob.createWriteStream();

        blobStream.on("err", (err) => {
            reject(`Unable to upload image, something went wrong`);
        });

        blobStream.on("finish", () => {
            console.log("이미지 업로드 성공");
            const publicUrl = format(
                `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
            resolve(publicUrl);
        });

        blobStream.end(buffer);
    });

export const SingleImageUpload = async (req, res, next) => {
    try {
        //single file
        if (!req.file) {
            return res
                .status(403)
                .send(resFormat.fail(403, "파일을 업로드해주세요"));
        }
        const imageUrl = await uploadIamge(req.file);
        res.status(200).send(
            resFormat.successData(200, "이미지 업로드 성공", imageUrl)
        );
    } catch (err) {
        console.error(err);
        next(err);
    }
};
