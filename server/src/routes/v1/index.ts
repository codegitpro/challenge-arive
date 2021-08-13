import express from "express";

import { entryRoutes } from "./entry.route";
import { hobbyRoutes } from "./hobby.route";
import { userRoutes } from "./user.route";

const router = express.Router();

router.use("/v1", entryRoutes);
router.use("/v1/hobbies", hobbyRoutes);
router.use("/v1/users", userRoutes);

export const routes_v1 = router;
