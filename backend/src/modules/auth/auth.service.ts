import { getUserByPhone } from "../../utils/findUser";
import { TLogin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

// change password
const changepassword = async () => {};

// refresh token
const refreshToken = async () => {};

// logout user
const logout = async () => {};
// get user info
const getUser = async () => {};
