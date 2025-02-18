import catchAsync from "../../utils/catchAsync";
import { OK } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { collectionServices } from "./collection.service";

const createCollection = catchAsync(async (req, res) => {
	const payload = req.body;
	const result = await collectionServices.createCollectionIntoDB(payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Collection created",
		data: result,
	});
});

const deleteCollection = catchAsync(async (req, res) => {
	const id = req.params.id;
	const result = await collectionServices.deleteCollectionFromDb(id);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Customer deleted successfully",
		data: result,
	});
});

export const collectionController = {
	createCollection,
	deleteCollection,
};
