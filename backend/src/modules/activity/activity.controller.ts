import catchAsync from "../../utils/catchAsync";
import { OK } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { activityService } from "./activity.service";

const createActivity = catchAsync(async (req, res) => {
	const payload = req.body;
	const result = await activityService.createActivityIntoDB(payload);

	sendResponse(res, {
		statusCode: OK,
		success: true,
		message: "Activity created!",
		data: result,
	});
});

export const activityController = { createActivity };
