import express from "express";
import { EntryController } from "../../controllers";

const router = express.Router();

router.route("/").all(EntryController.welcome);

export const entryRoutes = router;
