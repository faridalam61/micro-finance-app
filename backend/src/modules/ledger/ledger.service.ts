import { TLedger } from "./ledger.interface";
import { Ledger } from "./ledger.model";

// Create ledger entry
const createLedgerEntryIntoDB = async (payload: TLedger) => {
	const result = await Ledger.create(payload);
	return result;
};

// get all ledger entry
const getAllLedgerEntryFromDB = async () => {
	const result = await Ledger.find();
	return result;
};



export const ledgerServices = {
	createLedgerEntryIntoDB,
	getAllLedgerEntryFromDB,
	
};
