import AWS from "aws-sdk";
import env from "./index";

export const s3 = new AWS.S3({
    accessKeyId: env.S3_KEYID,
    secretAccessKey: env.S3_PRIVATE_KEY,
    region: env.REGION,
});
