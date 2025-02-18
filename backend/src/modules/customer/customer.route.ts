import express from "express";
import { validateRequest } from "../../utils/validateRequest";
import { customerValidation } from "./customer.validation";
import { customerController } from "./customer.controller";

const router = express.Router();

// api endpoint prefix 'api/v1/customer'

// Create customer
router.post(
	"/",
	validateRequest(customerValidation.createCustomerSchema),
	customerController.createCustomer
);

// get all customer
router.get("/", customerController.getAllCustomer);

// get customer by id
router.get("/:id", customerController.getCustomerById);

// update customer
router.patch(
	"/:id",
	validateRequest(customerValidation.updateCustomerSchema),
	customerController.updateCustomer
);

// delete customer
router.delete("/:id", customerController.deleteCustomer);

export const customerRouter = router; // export the router to use in other files
