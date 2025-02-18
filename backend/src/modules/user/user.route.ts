import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { userValidationSchema } from "./user.validation";
import { userController } from "./user.controller";
const router = express.Router();

// api end point prefix: api/v1/user

// Create new user
router.post(
	"/",
	validateRequest(userValidationSchema.createUserValidation),
	userController.createUser
);

// get all user
router.get("/", userController.getAllUsers);

// get user by id
router.get("/:id", userController.getUserById);

// update user
router.patch(
	"/:id",
	validateRequest(userValidationSchema.updateUserValidation),
	userController.updateUser
);

// delete user
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
