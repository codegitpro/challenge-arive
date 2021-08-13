import httpStatus from "http-status";
import express from "express";
import { HobbyModel, UserModel } from "../models";
import { User } from "../../types";

export const UserController = {
    get: async (req: express.Request, res: express.Response, next: any) => {
        try {
            const userId = req.params.userId;
            const targetUser = await UserModel.findById(userId).populate("hobbies");

            res.status(httpStatus.OK);
            res.json({
                success: true,
                message: "Retrieved user successfully!",
                data: targetUser,
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req: express.Request, res: express.Response, next: any) => {
        try {
            const newUser = req.body as User;
            const isDuplicated = await UserModel.findOne({ name: newUser.name });

            if (!isDuplicated) {
                const user = await UserModel.create(newUser);
                res.status(httpStatus.CREATED);
                res.json({
                    success: true,
                    message: "Created new user successfully!",
                    data: user,
                });
            } else {
                res.status(httpStatus.CONFLICT);
                res.json({
                    success: false,
                    message: "User who has same name is already existed!",
                });
            }
        } catch (error) {
            next(error);
        }
    },

    update: async (req: express.Request, res: express.Response, next: any) => {
        try {
            const userId = req.params.userId;
            const userData = req.body as User;

            if (userId) {
                const sameNameUsers = await UserModel.find({ name: userData.name });
                const filtered = sameNameUsers.filter((item: User) => item._id != userId);
                const isDuplicated = filtered.length > 0;

                if (!isDuplicated) {
                    const user = await UserModel.findByIdAndUpdate(userId, { $set: { name: userData.name } });

                    res.status(httpStatus.OK);
                    res.json({
                        success: true,
                        message: "Updated user successfully!",
                        data: user,
                    });
                } else {
                    res.status(httpStatus.CONFLICT);
                    res.json({
                        success: false,
                        message: "User who has same name is already existed!",
                    });
                }
            } else {
                res.status(httpStatus.FORBIDDEN);
                res.json({
                    success: false,
                    message: "UserId is empty!",
                });
            }
        } catch (error) {
            next(error);
        }
    },

    list: async (req: express.Request, res: express.Response, next: any) => {
        try {
            const users = await UserModel.find().populate({ path: "hobbies" });

            res.status(httpStatus.OK);
            res.json({
                success: true,
                message: "Retrieved users successfully!",
                data: users,
            });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req: express.Request, res: express.Response, next: any) => {
        try {
            const userId = req.params.userId;
            await HobbyModel.deleteMany({ userId: userId });
            const user = await UserModel.findByIdAndDelete(userId);

            res.status(httpStatus.OK);
            res.json({
                success: false,
                message: "Deleted user successfully!",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    },
};
