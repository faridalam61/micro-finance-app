import z from "zod";

const createCustomerSchema = z.object({
	body: z.object({
		name: z.string().min(1, "Name is required"),
		phone: z.string().min(1, "Phone is required"),
		photo: z.string().min(1, "Customer photo is required"), // Change to string
		address: z.string().min(1, "Address is required"),
		nidPhoto: z.string().min(1, "NID photo is required"), // Change to string
		guarantorName: z.string().min(1, "Guarantor name is required"),
		guarantorId: z.string().min(1, "Guarantor ID is required"),
		guarantorPhone: z.string().min(1, "Guarantor phone is required"),
	}),
});
const updateCustomerSchema = z.object({
	body: z.object({
		name: z.string().min(1, "Name is required").optional(),
		phone: z.string().min(1, "Phone is required").optional(),
		photo: z.string().min(1, "Customer photo is required").optional(),
		address: z.string().min(1, "Address is required").optional(),
		nidPhoto: z.string().min(1, "Nid is required").optional(),
		guarantorName: z.string().min(1, "Guarantor name is required").optional(),
		guarantorNid: z.string().min(1, "Guarantor nid is required").optional(),
		guarantorPhone: z.string().min(1, "Guarantor phone is required").optional(),
	}),
});

export const customerValidation = {
	createCustomerSchema,
	updateCustomerSchema,
};
