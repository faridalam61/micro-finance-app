import z from "zod";

const createLedgerValidation = z.object({
	body: z.object({
		transectionType: z.enum([
			"expense",
			"cash in",
			"cash out",
			"withdraw",
			"invest",
		]),

		description: z.string().min(1),
		debit: z.number().optional(),
		credit: z.number().optional(),
		amount: z.number().optional(),
	}),
});

export const ledgerValidationSchema = {
	createLedgerValidation,
};
