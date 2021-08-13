import mongoose from "mongoose";
import { config } from "./config";

export const Mongoose = {
    connect: () => {
        if (config.env === "development") {
            mongoose.set("debug", true);
        }

        mongoose.connect(config.mongo.uri, {
            useCreateIndex: true,
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        mongoose.connection.on("error", (err) => {
            console.log(`MongoDB connection error: ${err}`);
            process.exit(-1);
        });

        mongoose.connection.once("open", () => {
            console.log(`MongoDB is connected!: ${config.mongo.uri}`);
        });
    },
};
