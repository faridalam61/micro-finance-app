import AppError from "../../errors/appError";
import { getUserById, getUserByPhone } from "../../utils/findUser";
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "../../utils/httpStatusCode";
import { User } from "../user/user.model";
import { TChangePassword, TLogin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

// login user
const login = async (payload: TLogin) => {
	// check if user is exist
	const user = await getUserByPhone(payload.phone);
	if (!user) {
		throw new AppError(NOT_FOUND,"User not found");
	}

	// check if user is blocked
	const status = user?.status;
	if (status === "blocked") {
		throw new AppError(FORBIDDEN, "User is blocked");
	}

	// check id password
	const matchPassword = await bcrypt.compare(payload.password, user.password);
	if (!matchPassword) {
		throw new AppError(UNAUTHORIZED, "Invalid credentials");
	}

	// generate access token
	const accessToken = jwt.sign(
		{ userId: user.id, phone: user.phone, role: user.role },
		process.env.JWT_ACCESS_SECRET as string,
		{ expiresIn: process.env.JWT_ACCESS_EXPIRE }
	);

	// Generate refress token

	const refreshToken = jwt.sign(
		{ userId: user.id, phone: user.phone, role: user.role },
		process.env.JWT_REFRESH_SECRET as string,
		{
			expiresIn: process.env.JWT_REFRESH_EXPIRE,
		}
	);

	// return access token and refress token
	return { accessToken, refreshToken };
};

// change password by admin
const changePasswordByAdmin = async (payload: any) => {
	const hashedPassword = await bcrypt.hash(payload.password, 10);
	await User.findByIdAndUpdate(payload.id, { password: hashedPassword });
};

// change password by user
const changePasswordByUser = async (
	userData: JwtPayload,
	payload: TChangePassword
) => {
	// check if user is exist
	const user = await getUserById(userData.id);
	if (!user) {
		throw new AppError(NOT_FOUND, "User not found");
	}

	// Check if old password is matched
	const matchPassword = await bcrypt.compare(
		payload.oldPassword,
		user.password
	);

	if (!matchPassword) {
		throw new AppError(BAD_REQUEST,"Password didnt match");
	}
	const checkSamePassword = await bcrypt.compare(
		payload.newPassword,
		user.password
	);

	// check new password and old password is not same
	if (checkSamePassword) {
		throw new AppError(BAD_REQUEST,"Old password and new password cant be same");
	}
	// hash password
	const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

	// update database
	await User.findByIdAndUpdate(userData.id, { password: hashedPassword });
};

/**
 * this function will recieve a token. @type String
 * validate the token
 * extract user from the token
 * check if the user is available on database
 * check user current status
 * if everyting is right gernerate a new access token and return it
 */
const refreshToken = async (token: string) => {
	// decode token using jwt
	const decoded = (await jwt.verify(
		token,
		process.env.JWT_REFRESH_SECRET as string
	)) as JwtPayload;
	const { userId } = decoded;

	if (!decoded) {
		throw new AppError(UNAUTHORIZED, "Invlaid token");
	}

	// check if user exist
	const user = await User.findById(userId);
	if (!user) {
		throw new AppError(NOT_FOUND, "User not found");
	}

	// check user status

	const status = user.status;

	if (status === "blocked") {
		throw new AppError(FORBIDDEN,"User is blocked");
	}

	// generate access token
	const accessToken = await jwt.sign(
		{ userId: user.id, role: user.role, phone: user.phone },
		process.env.JWT_ACCESS_SECRET as string,
		{ expiresIn: "1d" }
	);
	// return token
	return { accessToken };
};

// logout user
const logout = async () => {};
// get user info
const getUser = async (userId: string) => {
	const user = await User.findById(userId);
	return user;
};

export const authServices = {
	login,
	logout,
	getUser,
	changePasswordByAdmin,
	changePasswordByUser,
	refreshToken,
};
