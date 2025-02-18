import catchAsync from "../../utils/catchAsync";
import { OK } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { loanServices } from "./loan.service";

// Create loan
const createLoan = catchAsync(async (req, res) => {
	const payload = req.body;

	const result = await loanServices.createLoanIntoDB(payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Loan created successfully",
		data: result,
	});
});

// get all loan
const getAllLoans = catchAsync(async (req, res) => {
	const result = await loanServices.getAllLoanFromDB();

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "All Loans retrived successfully",
		data: result,
	});
});

// get single loan
const getLoanById = catchAsync(async (req, res) => {
	const id = req.params.id;
	const result = await loanServices.getLoanByIdFromDB(id);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Loan retrived successfully",
		data: result,
	});
});

// update loan
const updateLoan = catchAsync(async (req, res) => {
	const id = req.params.id;
	const payload = req.body;

	const result = await loanServices.updateLoanIntoDB(id, payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Loan updated successfully",
		data: result,
	});
});

// delete loan

const deleteLoan = catchAsync(async (req, res) => {
	const id = req.params.id;
	const result = await loanServices.deleteLoanFromDB(id);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Loan deleted successfully",
		data: result,
	});
});

export const loanController = {
	createLoan,
	getAllLoans,
	getLoanById,
	updateLoan,
	deleteLoan,
};
