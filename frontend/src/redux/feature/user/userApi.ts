import { baseApi } from "../../api/baseApi";
export type TUser = {
	_id: string;
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
		getSingleUser: builder.query({
			query: (id: string) => ({
				url: `/user/${id}`,
				method: "GET",
			}),
		}),
		createUser: builder.mutation({
			query: (data) => ({
				url: "/user",
				method: "post",
				body: data,
			}),
		}),

		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/user/${id}`,
				method: "DELETE",
			}),
		}),
		updateUser: builder.mutation({
			query: ({ id, payload }) => ({
				url: `/user/${id}`,
				method: "PATCH",
				body: payload,
			}),
		}),
	}),
});

export const {
	useGetAllUsersQuery,
	useGetSingleUserQuery,
	useCreateUserMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
} = userApi;
