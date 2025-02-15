"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "../components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/ui/form";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../components/ui/popover";
import { Input } from "../components/ui/input";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { cn } from "../lib/utils";

const users = [
	{ label: "John Doe", value: "john.doe" },
	{ label: "Jane Smith", value: "jane.smith" },
	{ label: "Bob Johnson", value: "bob.johnson" },
] as const;

const formSchema = z.object({
	user: z.string({
		required_error: "Please select a user.",
	}),
	loanAmount: z
		.number({
			required_error: "Please enter a loan amount.",
			invalid_type_error: "Loan amount must be a number.",
		})
		.positive("Loan amount must be positive."),
	interestRate: z
		.number({
			required_error: "Please enter an interest rate.",
			invalid_type_error: "Interest rate must be a number.",
		})
		.min(0, "Interest rate cannot be negative.")
		.max(100, "Interest rate cannot exceed 100%."),
});

export function DisburseLoanForm() {
	const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(_values: z.infer<typeof formSchema>) {
		setIsConfirmOpen(true);
	}

	function handleConfirm() {
		const values = form.getValues();
		console.log("Form data:", values);
		setIsConfirmOpen(false);
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="user"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>User</FormLabel>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											className={cn(
												"w-full justify-between",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value
												? users.find((user) => user.value === field.value)
														?.label
												: "Select user"}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Command>
										<CommandInput placeholder="Search user..." />
										<CommandList>
											<CommandEmpty>No user found.</CommandEmpty>
											<CommandGroup>
												{users.map((user) => (
													<CommandItem
														value={user.label}
														key={user.value}
														onSelect={() => {
															form.setValue("user", user.value);
															setOpen(false);
														}}
													>
														<Check
															className={cn(
																"mr-2 h-4 w-4",
																user.value === field.value
																	? "opacity-100"
																	: "opacity-0"
															)}
														/>
														{user.label}
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormDescription>
								Select the user applying for the loan.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="loanAmount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Loan Amount</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Enter loan amount"
									{...field}
									onChange={(e) =>
										field.onChange(Number.parseFloat(e.target.value))
									}
								/>
							</FormControl>
							<FormDescription>
								Enter the requested loan amount in dollars.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="interestRate"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Interest Rate</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Enter interest rate"
									{...field}
									onChange={(e) =>
										field.onChange(Number.parseFloat(e.target.value))
									}
								/>
							</FormControl>
							<FormDescription>
								Enter the annual interest rate as a percentage.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				{form.watch("loanAmount") && form.watch("interestRate") && (
					<div className="text-lg font-semibold mb-4">
						Total Repayment: $
						{(
							form.watch("loanAmount") *
							(1 + form.watch("interestRate") / 100)
						).toFixed(2)}
					</div>
				)}
				<Button type="submit">Submit Application</Button>
			</form>

			<AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Loan Application</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to submit this loan application? This action
							cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirm}>
							Confirm
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Form>
	);
}
