import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { authValidation } from "./auth.validation";
import { authControllers } from "./auth.controller";
import auth from "../../middleware/auth";
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

router.get("/", auth("admin","user"), authControllers.getUser)
export const authRoutes = router;
