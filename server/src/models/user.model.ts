import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name is required"],
        },
    },
    { timestamps: true },
);

userSchema.virtual("hobbies", {
    ref: "Hobby",
    localField: "_id",
    foreignField: "userId",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

export const UserModel = mongoose.model("User", userSchema);
