import z from "zod";

const loginUserScheam = z.object({
	body: z.object({
		phone: z.string(),
		password: z.string(),
	}),
});

export const authValidation = { loginUserScheam };
