import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { ledgerController } from "./ledger.controller";
import { ledgerValidationSchema } from "./ledger.validation";

const router = express.Router();

// api end point prefix: api/v1/ledger

// Create new loan
router.post(
	"/",
	validateRequest(ledgerValidationSchema.createLedgerValidation),
	ledgerController.createLedgerEntry
);

// get all user
router.get("/", ledgerController.getAllLedgerEntry);

export const ledgerRoutes = router;
