import z from "zod";

const createLoanSchema = z.object({
	body: z.object({
		customerId: z.string(),
		loanAmount: z.number(),
		remainingAmount: z.number(),
		status: z.enum(["in progress", "paid", "CNC"]),
	}),
});

const updateLoanSchema = z.object({
	body: z.object({
		customerId: z.string(),
		loanAmount: z.number(),
		remainingAmount: z.number(),
		status: z.enum(["in progress", "paid", "CNC"]),
	}),
});

export const loanValidation = { createLoanSchema, updateLoanSchema };
