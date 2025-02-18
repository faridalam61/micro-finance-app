import { TActivity } from "./activity.interface";
import { Activity } from "./activity.model";

const createActivityIntoDB = async (payload: TActivity) => {
	const result = await Activity.create(payload);
	return result;
};

export const activityService = { createActivityIntoDB };
