import catchAsync from "../../utils/catchAsync";
import { OK } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

// login user
const loginUser = catchAsync(async (req, res) => {
	const payload = req.body;
	const result = await authServices.login(payload);

	const { accessToken, refreshToken } = result;

	// Set cookie
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
	});
	console.log(accessToken, refreshToken);
	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Login successfull",
		data: { accessToken },
	});
});

// change password by admin
const changePassByAdmin = catchAsync(async (req, res) => {
	const payload = req.body;
	await authServices.changePasswordByAdmin(payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Password changed",
		data: "",
	});
});

// change password by user
const changePassByUser = catchAsync(async (req, res) => {
	const userData = {};
	const payload = req.body;

	await authServices.changePasswordByUser(userData, payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Password changed",
		data: "",
	});
});

// refresh token
const refreshToken = catchAsync(async (req, res) => {
	const refreshToken = req.cookies;
	const result = await authServices.refreshToken(refreshToken);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Access token is retrieved succesfully!",
		data: result,
	});
});

// get user
const getUser = catchAsync(async (req, res) => {});
// logout

const logOut = catchAsync(async (req, res) => {});

export const authControllers = {
	loginUser,
	changePassByAdmin,
	changePassByUser,
	refreshToken,
	getUser,
	logOut,
};
