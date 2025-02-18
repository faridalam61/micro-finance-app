import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { loanValidation } from "./loan.validation";
import { loanController } from "./loan.controller";

const router = express.Router();

// api end point prefix: api/v1/loan

// Create new loan
router.post(
	"/",
	validateRequest(loanValidation.createLoanSchema),
	loanController.createLoan
);

// get all user
router.get("/", loanController.getAllLoans);

// get user by id
router.get("/:id", loanController.getLoanById);

// update user
router.patch(
	"/:id",
	validateRequest(loanValidation.updateLoanSchema),
	loanController.updateLoan
);

// delete user
router.delete("/:id", loanController.deleteLoan);

export const loanRoutes = router;
