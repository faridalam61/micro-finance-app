import { getUserById, getUserByPhone } from "../../utils/findUser";
import { User } from "../user/user.model";
import { TChangePassword, TLogin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

// login user
const login = async (payload: TLogin) => {
	// check if user is exist
	const user = await getUserByPhone(payload.phone);
	if (!user) {
		throw new Error("User not found");
	}

	// check if user is blocked
	const status = user.status;
	if (status === "blocked") {
		throw new Error("User is blocked");
	}

	// check id password
	const matchPassword = await bcrypt.compare(payload.password, user.password);
	if (!matchPassword) {
		throw new Error("Invalid credentials");
	}

	// generate access token
	const accessToken = jwt.sign(
		{ userId: user.id, phone: user.phone },
		process.env.JWT_ACCESS_SECRET as string,
		{ expiresIn: process.env.JWT_ACCESS_EXPIRE }
	);

	// Generate refress token

	const refreshToken = jwt.sign(
		{ userId: user.id, phone: user.phone },
		process.env.JWT_REFRESH_SECRET as string,
		{
			expiresIn: process.env.JWT_REFRESH_EXPIRE,
		}
	);

	// return access token and refress token
	return { accessToken, refreshToken };
};

// change password by admin
const changePasswordByAdmin = async (id: string, password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	await User.findByIdAndUpdate(id, { password: hashedPassword });
};

// change password by user
const changePasswordByUser = async (
	userData: JwtPayload,
	payload: TChangePassword
) => {
	// check if user is exist
	const user = await getUserById(userData.id);
	if (!user) {
		throw new Error("User not found");
	}

	// Check if old password is matched
	const matchPassword = await bcrypt.compare(
		payload.oldPassword,
		user.password
	);

	if (!matchPassword) {
		throw new Error("Password didnt match");
	}
	const checkSamePassword = await bcrypt.compare(
		payload.newPassword,
		user.password
	);

	// check new password and old password is not same
	if (checkSamePassword) {
		throw new Error("Old password and new password cant be same");
	}
	// hash password
	const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

	// update database
	await User.findByIdAndUpdate(userData.id, { password: hashedPassword });
};

// refresh token
const refreshToken = async () => {};

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
