import { baseApi } from "../../api/baseApi";
export type TUser = {
	id: string;
	name: string;
	phone: string;
	password: string;
	role: string;
	status: "active" | "blocked";
	lastLogin: Date;
	createdAt: string;
};

const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query({
			query: () => ({
				url: "/user",
				method: "GET",
			}),
		}),
	}),
});

export const { useGetAllUsersQuery } = userApi;
