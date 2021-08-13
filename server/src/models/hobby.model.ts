import mongoose from "mongoose";
import { AppConstants } from "../constants";

const hobbySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name is required"],
        },
        passionLevel: {
            type: String,
            enum: AppConstants.passionLevel,
            trim: true,
            required: [true, "passionLevel is required"],
        },
        year: {
            type: Date,
            required: [true, "year is required"],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

export const HobbyModel = mongoose.model("Hobby", hobbySchema);
