import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../feature/store";
import { setUser } from "../feature/auth/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5001/api/v1",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;

		if (token) {
			headers.set("authorization", token);
		}
	},
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		const res = await fetch("http://localhost:5001/api/v1/auth/refreshToken", {
			method: "post",
			credentials: "include",
		});

		const data = await res.json();
		const user = (api.getState() as RootState).auth.user;

		api.dispatch(setUser({ user, token: data.accessToken }));
	}

	return result;
};

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQueryWithRefreshToken,
	endpoints: () => ({}),
});
