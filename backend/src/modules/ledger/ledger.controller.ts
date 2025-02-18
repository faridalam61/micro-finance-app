import catchAsync from "../../utils/catchAsync";
import { OK } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { ledgerServices } from "./ledger.service";


// Create ledger entry
const createLedgerEntry = catchAsync(async (req, res) => {
	const payload = req.body;

	const result = await ledgerServices.createLedgerEntryIntoDB(payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Ledger entry created successfully",
		data: result,
	});
});

// get all ledger entries
const getAllLedgerEntry = catchAsync(async (req, res) => {
	const result = await ledgerServices.getAllLedgerEntryFromDB();

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "All entries retrived successfully",
		data: result,
	});
});


export const ledgerController = {
	createLedgerEntry,
	getAllLedgerEntry,
	
};
