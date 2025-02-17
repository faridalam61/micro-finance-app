export type TUser = {
	name: string;
	phone: string;
	password: string;
	role: string;
	status: "active" | "blocked";
	lastLogin: Date;
};
