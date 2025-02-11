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
import { Textarea } from "./ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	role: z.string().min(1, {
		message: "Please select a role.",
	}),
	description: z.string().min(5, {
		message: "Description must be at least 5 characters.",
	}),
});

const CashInOutForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			role: "",
			description: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{/* Username Field */}
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input placeholder="Enter amount" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Select Field (Role) */}
				<FormField
					control={form.control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Transection type</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a transection type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="investment">Investment</SelectItem>
										<SelectItem value="borrow">Borrow</SelectItem>
										<SelectItem value="return_borrowed">Return</SelectItem>
										<SelectItem value="expense">Expense</SelectItem>
										<SelectItem value="withdrawal">withdrawal</SelectItem>
										<SelectItem value="lend">Lend</SelectItem>
										<SelectItem value="recieved_lended">Recived</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Description Field */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea placeholder="Enter description..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default CashInOutForm;
