import z from "zod";

const createActivityValidation = z.object({
	body: z.object({
		userId: z.string(),
		description: z.string().trim(),
	}),
});

export const activityValidationSchema = { createActivityValidation };
