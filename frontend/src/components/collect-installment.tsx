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
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "../components/ui/command";
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
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const formSchema = z.object({
	option: z.string().min(1, { message: "Please select an option." }),
	amount: z.coerce.number().min(1, { message: "Amount must be at least 1." }),
});

type FormValues = z.infer<typeof formSchema>;

const options = [
	{ label: "Option 1", value: "option1" },
	{ label: "Option 2", value: "option2" },
	{ label: "Option 3", value: "option3" },
];

const CollectInstallmentForm = () => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			option: "",
			amount: 1,
		},
	});

	const [open, setOpen] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);

	const onSubmit = (values: FormValues) => {
		console.log("Submitted Data:", values);
		setConfirmOpen(false);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setConfirmOpen(true);
				}}
				className="space-y-4"
			>
				<FormField
					control={form.control}
					name="option"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Select Option</FormLabel>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button variant="outline" className="w-full justify-between">
										{field.value
											? options.find((opt) => opt.value === field.value)?.label
											: "Select an option"}
										<ChevronDown className="ml-2 h-4 w-4" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Command>
										<CommandInput placeholder="Search options..." />
										<CommandEmpty>No results found.</CommandEmpty>
										<CommandGroup>
											{options.map((opt) => (
												<CommandItem
													key={opt.value}
													value={opt.value}
													onSelect={() => {
														form.setValue("option", opt.value);
														setOpen(false);
													}}
												>
													<Check
														className={`mr-2 h-4 w-4 ${
															field.value === opt.value
																? "opacity-100"
																: "opacity-0"
														}`}
													/>
													{opt.label}
												</CommandItem>
											))}
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="amount"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									type="number"
									placeholder="Enter amount"
									{...field}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
			<AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm Submission</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to submit this form?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={form.handleSubmit(onSubmit)}>
							Confirm
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Form>
	);
};

export default CollectInstallmentForm;
