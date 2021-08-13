import express from "express";

export const EntryController = {
    welcome: async (req: express.Request, res: express.Response, next: any) => {
        try {
            res.send("Welcome Arive platform");
        } catch (error) {
            next(error);
        }
    },
};
