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
};
