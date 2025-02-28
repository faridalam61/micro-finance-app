import { model, Schema } from "mongoose";
import { TCustomer } from "./customer.interface";

const customerSchema = new Schema<TCustomer>(
	{
		name: { type: String, required: true },
		phone: { type: String, required: true },
		address: { type: String, required: true },
		photo: { type: String, required: true },
		nidPhoto: { type: String, required: true },
		guarantorName: { type: String, required: true },
		guarantorPhone: { type: String, required: true },
		guarantorNid: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Customer = model<TCustomer>("customer", customerSchema);
