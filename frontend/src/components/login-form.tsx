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
import { useAppDispatch } from "../redux/feature/hooks";
import { setUser } from "../redux/feature/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const formSchema = z.object({
	phone: z.string().min(1, "Phone number is required"),
	password: z.string().min(1, "Enter your password"),
});

export function LoginForm() {
	const dispatch = useAppDispatch();
	const [login, { error, isLoading }] = useLoginMutation();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phone: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const res = await login(values).unwrap();
		console.log(res);
		const user = verifyToken(res.data.accessToken);
		dispatch(setUser({ user, token: res.data.accessToken }));
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
						{/* {error && <p className="text-red-600">{error}</p>} */}
						{/* {success && <p className="text-green-600">{success}</p>} */}
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
