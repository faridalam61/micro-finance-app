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
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "./ui/dialog";
import { useState } from "react";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Amount must be at least 2 characters.",
	}),
	role: z.string().min(1, {
		message: "Please select a transaction type.",
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

	const [dialogOpen, setDialogOpen] = useState(false);
	const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(
		null
	);

	function handleConfirmSubmit() {
		if (formData) {
			console.log("Submitted Data:", formData);
			setDialogOpen(false);
			form.reset(); // Reset form after submission
		}
	}

	function onSubmit(values: z.infer<typeof formSchema>) {
		setFormData(values);
		setDialogOpen(true);
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					{/* Amount Field */}
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

					{/* Transaction Type Field */}
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Transaction Type</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a transaction type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="investment">Investment</SelectItem>
											<SelectItem value="borrow">Borrow</SelectItem>
											<SelectItem value="return_borrowed">Return</SelectItem>
											<SelectItem value="expense">Expense</SelectItem>
											<SelectItem value="withdrawal">Withdrawal</SelectItem>
											<SelectItem value="lend">Lend</SelectItem>
											<SelectItem value="received_lended">Received</SelectItem>
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

					<Button type="submit" className="w-full">
						Submit
					</Button>
				</form>
			</Form>

			{/* Confirmation Dialog */}
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Submission</DialogTitle>
					</DialogHeader>

					<div>
						<p>
							<strong>Amount:</strong> {formData?.username}
						</p>
						<p>
							<strong>Transaction Type:</strong> {formData?.role}
						</p>
						<p>
							<strong>Description:</strong> {formData?.description}
						</p>
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleConfirmSubmit}>Confirm</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default CashInOutForm;
