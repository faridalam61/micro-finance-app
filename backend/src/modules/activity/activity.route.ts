import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { activityValidationSchema } from "./activity.validation";
import { activityController } from "./activity.controller";

const router = express.Router();

router.post(
	"/",
	validateRequest(activityValidationSchema.createActivityValidation),
	activityController.createActivity
);

export const activityRoutes = router; // Export the router to use it in other files
