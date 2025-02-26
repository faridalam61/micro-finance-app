import {
	BaseQueryApi,
	BaseQueryFn,
	DefinitionType,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../feature/store";
import { logOut, setUser } from "../feature/auth/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5001/api/v1",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;

		if (token) {
			headers.set("authorization", `${token}`);
		}

		return headers;
	},
});

const baseQueryWithRefreshToken: BaseQueryFn<
	FetchArgs,
	BaseQueryApi,
	DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 500) {
		//* Send Refresh
		console.log("Sending refresh token");

		const res = await fetch("http://localhost:5001/api/v1/auth/refreshToken", {
			method: "POST",
			credentials: "include",
		});

		const data = await res.json();

		if (data?.data?.accessToken) {
			const user = (api.getState() as RootState).auth.user;

			api.dispatch(
				setUser({
					user,
					token: data.data.accessToken,
				})
			);

			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}

	return result;
};

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQueryWithRefreshToken,
	endpoints: () => ({}),
});
