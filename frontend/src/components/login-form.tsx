import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "./ui/card";
import { Loader } from "lucide-react";
import { useLoginMutation } from "../redux/feature/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/feature/hooks";
import {
	setUser,
	TUser,
	useCurrentToken,
} from "../redux/feature/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { Navigate } from "react-router";
import { toast } from "sonner";

const formSchema = z.object({
	phone: z.string().min(1, "Phone number is required"),
	password: z.string().min(1, "Enter your password"),
});

export function LoginForm() {
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phone: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const toastId = toast.loading("logging in...");
		try {
			const res = await login(values).unwrap();
			const user = verifyToken(res.data.accessToken) as TUser;
			dispatch(setUser({ user, token: res.data.accessToken }));
			toast.success("Login successful", { id: toastId });
		} catch (err) {
			toast.error("Something went wrong", { id: toastId });
		}
	}

	const token = useAppSelector(useCurrentToken);
	if (token) {
		return <Navigate to="/dashboard" replace={true} />;
	}
	return (
		<Card>
			<CardHeader className="text-center">
				<h2 className="text-2xl">Log In</h2>
				<CardDescription>Enter your credentials to login</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone number</FormLabel>
									<FormControl>
										<Input placeholder="Enter phone number" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your password"
											type="password"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? <Loader /> : "Login"}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter>
				<p className="text-xs text-center">
					Microfinance system. Developed and maintained by Farid Alam
				</p>
			</CardFooter>
		</Card>
	);
}
