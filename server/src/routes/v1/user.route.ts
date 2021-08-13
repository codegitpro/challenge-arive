import express from "express";
import { validate } from "express-validation";

import { UserController } from "../../controllers";
import { UserValidation } from "../../validations";

const router = express.Router();

router.route("/").get(UserController.list);

router.route("/").post(validate(UserValidation.createUser), UserController.create);

router.route("/:userId").get(UserController.get);

router.route("/:userId").patch(validate(UserValidation.updateUser), UserController.update);

router.route("/:userId").delete(UserController.remove);

export const userRoutes = router;
