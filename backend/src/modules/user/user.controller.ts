import catchAsync from "../../utils/catchAsync";
import { OK } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

// Create new user
const createUser = catchAsync(async (req, res) => {
	const payload = req.body;

	const result = await userServices.createUserIntoDB(payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "User created successfully",
		data: result,
	});
});

// get all user
const getAllUsers = catchAsync(async (req, res) => {
	const result = await userServices.getAllUserFromDB();

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "All users retrived successfully",
		data: result,
	});
});

// get user by id
const getUserById = catchAsync(async (req, res) => {
	const id = req.params.id;
	const result = await userServices.getUserByIdFromDB(id);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "User retrived successfully",
		data: result,
	});
});

// update user
const updateUser = catchAsync(async (req, res) => {
	const id = req.params.id;
	const payload = req.body;
	console.log(payload);
	const result = await userServices.updateUserIntoDB(id, payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "User updated successfully",
		data: result,
	});
});

// delete user

const deleteUser = catchAsync(async (req, res) => {
	const id = req.params.id;
	const result = await userServices.deleteUserFromDB(id);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "User deleted successfully",
		data: result,
	});
});

export const userController = {
	createUser,
	getAllUsers,
	getUserById,
	updateUser,
	deleteUser,
};
