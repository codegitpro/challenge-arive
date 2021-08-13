import express from "express";
import { validate } from "express-validation";
import { HobbyController } from "../../controllers";
import { HobbyValidation } from "../../validations";

const router = express.Router();

router.route("/").get(HobbyController.list);

router.route("/:userId").post(validate(HobbyValidation.createHobby), HobbyController.create);

router.route("/:hobbyId").get(HobbyController.get);

router.route("/:hobbyId").patch(validate(HobbyValidation.updateHobby), HobbyController.update);

router.route("/:hobbyId").delete(HobbyController.remove);

export const hobbyRoutes = router;
