import catchAsync from "../../utils/catchAsync";
import { OK } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { customerServices } from "./customer.service";

// Create customer
const createCustomer = catchAsync(async (req, res) => {
	const payload = req.body;
	const result = await customerServices.createCustomerIntoDB(payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Customer created successfully",
		data: result,
	});
});

// get all customer
const getAllCustomer = catchAsync(async (req, res) => {
	const result = await customerServices.getAllCustomerFromDB();

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Customers retrived successfully",
		data: result,
	});
});

// get customer by id
const getCustomerById = catchAsync(async (req, res) => {
	const id = req.params.id;
	const result = await customerServices.getCustomerByIDFromDB(id);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Customer retrived successfully",
		data: result,
	});
});

// update customer
const updateCustomer = catchAsync(async (req, res) => {
	const id = req.params.id;
	const payload = req.body;
	const result = await customerServices.updateCustomerIntoDB(id, payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Customer updated successfully",
		data: result,
	});
});

// delete customer
const deleteCustomer = catchAsync(async (req, res) => {
	const id = req.params.id;
	const result = await customerServices.deleteCustomerFromDB(id);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Customer deleted successfully",
		data: result,
	});
});

export const customerController = {
	getAllCustomer,
	getCustomerById,
	updateCustomer,
	deleteCustomer,
	createCustomer,
};
