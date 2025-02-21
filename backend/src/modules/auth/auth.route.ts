import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { authValidation } from "./auth.validation";
import { authControllers } from "./auth.controller";
/**
 * Auth route prefix
 * api/v1/auth
 */

const router = express.Router();

// login route
router.post(
	"/",
	validateRequest(authValidation.loginUserScheam),
	authControllers.loginUser
);

export const authRoutes = router;
