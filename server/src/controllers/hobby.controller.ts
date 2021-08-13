import express from "express";
import httpStatus from "http-status";
import { HobbyModel, UserModel } from "../models";
import { Hobby } from "../../types";

export const HobbyController = {
    get: async (req: express.Request, res: express.Response, next: any) => {
        try {
            const hobbyId = req.params.hobbyId;
            const targetHobby = await HobbyModel.findById(hobbyId).populate("user");

            res.status(httpStatus.OK);
            res.json({
                success: true,
                message: "Retrieved hobby successfully!",
                data: targetHobby,
            });
        } catch (error) {
            next(error);
        }
    },

    create: async (req: express.Request, res: express.Response, next: any) => {
        try {
            const userId = req.params.userId;
            const isExistingUser = await UserModel.findById(userId);

            if (!isExistingUser) {
                res.status(httpStatus.NOT_FOUND);
                return res.json({
                    success: false,
                    message: "UserId is not existed!",
                });
            }

            const newHobbyData = req.body as Hobby;
            const hobby = new HobbyModel(newHobbyData);
            // @ts-ignore
            hobby.userId = userId;
            await hobby.save();

            res.status(httpStatus.CREATED);
            res.json({
                success: true,
                message: "Created new hobby successfully!",
                data: hobby,
            });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: express.Request, res: express.Response, next: any) => {
        try {
            const hobbyId = req.params.hobbyId;
            const hobbyData = req.body as Hobby;

            if (hobbyId) {
                const hobby = await HobbyModel.findByIdAndUpdate(hobbyId, { $set: hobbyData });

                res.status(httpStatus.OK);
                res.json({
                    success: true,
                    message: "Updated hobby successfully!",
                    data: hobby,
                });
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
            const hobbies = await HobbyModel.find().populate("user");

            res.status(httpStatus.OK);
            res.json({
                success: true,
                message: "Retrieved hobbies successfully!",
                data: hobbies,
            });
        } catch (error) {
            next(error);
        }
    },

    remove: async (req: express.Request, res: express.Response, next: any) => {
        try {
            const hobbyId = req.params.hobbyId;
            const hobby = await HobbyModel.findByIdAndDelete(hobbyId);

            res.status(httpStatus.OK);
            res.json({
                success: true,
                message: "Deleted hobby successfully!",
                data: hobby,
            });
        } catch (error) {
            next(error);
        }
    },
};
