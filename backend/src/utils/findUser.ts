import { User } from "../modules/user/user.model";

export const getUserByPhone = async (phone: string) => {
	const user = await User.findOne({ phone });
	return user;
};

export const getUserById = async (id: string) => {
	const user = await User.findById(id);
	return user;
};
