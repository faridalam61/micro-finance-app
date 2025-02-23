import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "/auth",
				method: "POST",
				body: credentials,
			}),
		}),
	}),
});

export const { useLoginMutation } = authApi;
