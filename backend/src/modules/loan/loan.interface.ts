import { Types } from "mongoose";

export type TLoan = {
	customerId: Types.ObjectId;
	loanAmount: number;
	remainingAmount: number;
	status: "in progress" | "paid" | "CNC";
};
