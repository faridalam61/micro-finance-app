import { TLoan } from "./loan.interface";
import { Loan } from "./loan.model";

// Create loan
const createLoanIntoDB = async (payload: TLoan) => {
	const result = await Loan.create(payload);
	return result;
};

// get all loan
const getAllLoanFromDB = async () => {
	const result = await Loan.find();
	return result;
};

// get single loan
const getLoanByIdFromDB = async (id: string) => {
	const result = await Loan.findById(id);
	return result;
};

// update loan
const updateLoanIntoDB = async (id: string, payload: Partial<TLoan>) => {
	const result = await Loan.findByIdAndUpdate(id, payload, { new: true });
	return result;
};

// delete loan
const deleteLoanFromDB = async (id: string) => {
	const result = await Loan.findByIdAndDelete(id);
	return result;
};

export const loanServices = {
	createLoanIntoDB,
	getAllLoanFromDB,
	getLoanByIdFromDB,
	updateLoanIntoDB,
	deleteLoanFromDB,
};
