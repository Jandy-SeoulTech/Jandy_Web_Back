import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";
if (NODE_ENV === "production")
    dotenv.config({ path: `${__dirname}/../../.env.prod` });
else if (NODE_ENV === "development")
    dotenv.config({ path: `${__dirname}/../../.env.dev` });
else if (NODE_ENV === "test")
    dotenv.config({ path: `${__dirname}/../../.env.test` });

const env = process.env;

export default {
    NODE_ENV: NODE_ENV,
    PORT: Number(env.PORT),
    COOKIE_SECRET: env.COOKIE_SECRET,
    MAIL_EMAIL: env.MAIL_EMAIL,
    MAIL_PASSWORD: env.MAIL_PASSWORD,
    S3_KEYID: env.S3_KEYID,
    S3_PRIVATE_KEY: env.S3_PRIVATE_KEY,
    REGION: env.REGION,
    BUCKET_NAME: env.BUCKET_NAME,
};
