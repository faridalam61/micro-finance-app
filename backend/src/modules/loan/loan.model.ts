import { model, Schema } from "mongoose";
import { TLoan } from "./loan.interface";

const loanSchema = new Schema<TLoan>({
    customerId: {type: Schema.ObjectId, required: true, ref:"Customer"},
    loanAmount: {type: Number, required: true},
    remainingAmount: {type: Number, required: true},
    status : {type: String, enum:["in progress","paid","CNC"]}
},{timestamps: true})

export const Loan = model<TLoan>("loan",loanSchema)