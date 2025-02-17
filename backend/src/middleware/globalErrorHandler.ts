import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
	err,
	req,
	res,
	next
) => {
	res.status(500).json({
		success: false,
		message: "Internal server error",
		stack: process.env.NODE_ENV === "development" ? err.stack : null,
	});
};
