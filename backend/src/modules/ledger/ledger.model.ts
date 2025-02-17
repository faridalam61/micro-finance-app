import { model, Schema } from "mongoose";
import { TLedger } from "./ledger.interface";

const ledgerSchema = new Schema<TLedger>(
	{
		transectionType: {
			type: String,
			enum: ["expense", "cash in", "cash out", "withdraw", "invest"],
			required: true,
		},

		description: { type: String, required: true },
		debit: { type: Number, required: true, default: 0 },
		credit: { type: Number, required: true, default: 0 },
		balance: { type: Number, required: true },
	},
	{
		timestamps: true,
	}
);

export const Ledger = model<TLedger>("ledger", ledgerSchema);
