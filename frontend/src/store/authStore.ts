import { create } from "zustand";
import axios from "axios";

interface User {
	password: string;
	phone: string;
	message: string;
}

interface AuthState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
	success: string | null;
	isCheckingAuth: boolean;
	isAuthenticated: boolean;
	login: (credentials: { phone: string; password: string }) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
	user: null,
	isLoading: false,
	error: null,
	success: null,
	isCheckingAuth: false,
	isAuthenticated: false,
	login: async (credentials) => {
		console.log("from store:", credentials);
		set({ isLoading: true, error: null, success: null }); // Reset success message on login attempt
		try {
			const res = await axios.post<User>(
				"http://localhost:5001/api/v1/auth",
				credentials,
				{
					withCredentials: true,
					headers: { "Content-Type": "application/json" },
				}
			);
			console.log(res);
			set({ user: res.data, isLoading: false, success: res.data.message });
		} catch (err) {
			console.log(err);
			if (axios.isAxiosError(err)) {
				set({
					error: err.response?.data?.message || "An error occurred",
					isLoading: false,
					success: null, // Reset success message on error
				});
			} else {
				set({
					error: "An error occurred",
					isLoading: false,
					success: null, // Reset success message on error
				});
			}
		}
	},
	checkAuth: async () => {
		set({ isCheckingAuth: true });
		try {
			const res = await axios.get<User>(`http://localhost:5001/auth`);
		} catch (err) {
			set({ error: err.message, isAuthenticated: false });
		}
	},
}));
