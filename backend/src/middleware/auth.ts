/**
 * auth() will recieve option user role arguments.
 * this middleware will validate the user role.
 * if user is blocked
 * if user is authenticated
 */

import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { getUserById } from "../utils/findUser";
import AppError from "../errors/appError";
import { FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from "../utils/httpStatusCode";

const auth = (...userRoles: ("user" | "admin")[]) => {
	return catchAsync(async (req, res, next) => {
		const token = req.headers.authorization;
		console.log(token);
		if (!token) {
			throw new AppError(UNAUTHORIZED,"Token not found");
		}

		const decoded = jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET as string
		) as JwtPayload;

		const { userId, role } = decoded;

		// check if user is exist
		const user = await getUserById(userId);

		if (!user) {
			throw new AppError(NOT_FOUND,"User not found");
		}

		// check user status
		const status = user.status;

		if (status === "blocked") {
			throw new AppError(FORBIDDEN, "User is blocked");
		}

		// Check user role have access to the resource or not

		if (userRoles && !userRoles.includes(role)) {
			throw new AppError(FORBIDDEN, "You don't have access to this resource");
		}

		req.user = decoded as JwtPayload;

		next();
	});
};

export default auth;
