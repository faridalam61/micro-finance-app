import { Types } from "mongoose";

export type TActivity = {
	userId: Types.ObjectId;
	description: string;
};
