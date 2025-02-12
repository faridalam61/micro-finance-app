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
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

// Define validation schema
const formSchema = z.object({
	option: z.string().min(1, { message: "Please select an option." }),
	amount: z.coerce.number().min(1, { message: "Amount must be at least 1." }),
});

// Define form values type
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

	function onSubmit(values: FormValues) {
		console.log("Submitted Data:", values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* ComboBox Field */}
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

				{/* Number Field */}
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
		</Form>
	);
};

export default CollectInstallmentForm;
