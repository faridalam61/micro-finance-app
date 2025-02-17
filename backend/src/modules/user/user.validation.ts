import z from "zod";
const createUserValidation = z.object({
	body: z.object({
		name: z.string().min(1, "User name is required").max(30).trim(),
		phone: z.string().min(11).max(11),
		password: z.string().min(6),
		role: z.enum(["user", "admin"]).default("user"),
		status: z.enum(["active", "blocked"]).default("active"),
		lastLogin: z.date().optional(),
	}),
});

const updateUserValidation = z.object({
	body: z.object({
		name: z.string().min(1, "User name is required").max(30).trim().optional(),
		phone: z.string().min(11).max(11).optional(),
		password: z.string().min(6).optional(),
		role: z.enum(["user", "admin"]).optional(),
		status: z.enum(["active", "blocked"]).optional(),
		lastLogin: z.date().optional(),
	}),
});

export const userValidationSchema = {
	createUserValidation,
	updateUserValidation,
};
