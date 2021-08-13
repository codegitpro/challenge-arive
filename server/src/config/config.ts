import path from "path";
import dotenv from "dotenv-safe";

dotenv.config({
    allowEmptyValues: true,
    example: path.join(__dirname, "../../.env.example"),
});

export const config = {
    env: process.env.NODE_ENV,
    port: process.env.SERVER_PORT,
    mongo: {
        uri: process.env.MONGO_URI as string,
    },
};
