/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useCreatecustomerMutation } from "../redux/feature/customer/customerApi";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

const PHONE_REGEX = /^(017|019|018|016|013|014|015)\d{8}$/; // Regex for 11-digit phone numbers starting with specified prefixes

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	phone: z
		.string()
		.length(11, { message: "Phone number must be exactly 11 digits." })
		.regex(PHONE_REGEX, {
			message:
				"Phone number must start with 017, 019, 018, 016, 013, 014, or 015.",
		}),
	address: z.string().min(5, {
		message: "Address must be at least 5 characters.",
	}),
	photo: z
		.any()
		.refine((files) => files?.length === 1, "Photo is required.")
		.refine(
			(files) => files?.[0]?.size <= MAX_FILE_SIZE,
			`Max file size is 5MB.`
		)
		.refine(
			(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
			".jpg, .jpeg, .png and .webp files are accepted."
		),
	nidPhoto: z
		.any()
		.refine((files) => files?.length === 1, "NID photo is required.")
		.refine(
			(files) => files?.[0]?.size <= MAX_FILE_SIZE,
			`Max file size is 5MB.`
		)
		.refine(
			(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
			".jpg, .jpeg, .png and .webp files are accepted."
		),
	guarantorName: z.string().min(2, {
		message: "Guarantor name must be at least 2 characters.",
	}),
	guarantorId: z.string().min(5, {
		message: "Guarantor ID must be at least 5 characters.",
	}),
	guarantorPhone: z
		.string()
		.length(11, {
			message: "Guarantor phone number must be exactly 11 digits.",
		})
		.regex(PHONE_REGEX, {
			message:
				"Guarantor phone number must start with 017, 019, 018, 016, 013, 014, or 015.",
		}),
});

export function ApplicationForm() {
	const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
	const [nidPhotoPreview, setNidPhotoPreview] = React.useState<string | null>(
		null
	);

	const [createCustomer, { isLoading }] = useCreatecustomerMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			phone: "",
			address: "",
			guarantorName: "",
			guarantorId: "",
			guarantorPhone: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			// Create a FormData object
			const formData = new FormData();

			// Append the files
			if (values.photo && values.photo.length > 0) {
				formData.append("photo", values.photo[0]);
			} else {
				throw new Error("Photo is required.");
			}

			if (values.nidPhoto && values.nidPhoto.length > 0) {
				formData.append("nidPhoto", values.nidPhoto[0]);
			} else {
				throw new Error("NID photo is required.");
			}

			// Create an object for the other fields
			const data = {
				name: values.name,
				phone: values.phone,
				address: values.address,
				guarantorName: values.guarantorName,
				guarantorNid: values.guarantorId,
				guarantorPhone: values.guarantorPhone,
			};

			// Append the data object as a JSON string
			formData.append("data", JSON.stringify(data));

			// Send the FormData to the server
			const res = await createCustomer(formData);
			if (res.error) {
				console.error("Error response from server:", res.error);
				toast.error("Failed to create customer. Please try again.");
			} else {
				console.log("Success response from server:", res.data);
				toast.success("Customer created successfully!");
				form.reset();
				setPhotoPreview(null);
				setNidPhotoPreview(null);
			}
		} catch (err) {
			// Handle any errors that occur during the submission process
			console.error("Error occurred during form submission:", err);
			toast.error("An error occurred while submitting the form.");
		}
	}
	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		setPreview: (preview: string | null) => void
	) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setPreview(null);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder="John Doe" {...field} />
								</FormControl>
								<FormDescription>Enter your full name.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone</FormLabel>
								<FormControl>
									<Input placeholder="1234567890" {...field} />
								</FormControl>
								<FormDescription>Enter your phone number.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Textarea
									placeholder="123 Main St, City, Country"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>Enter your full address.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<FormField
						control={form.control}
						name="photo"
						// eslint-disalbe-next-line @typescript-eslint/no-unused-varsn@typescript-eslint/no-unused-vars
						render={({ field: { onChange, value, ...rest } }) => (
							<FormItem>
								<FormLabel>Photo</FormLabel>
								<FormControl>
									<div className="flex flex-col items-center">
										<Input
											type="file"
											accept=".jpg,.jpeg,.png,.webp"
											onChange={(e) => {
												onChange(e.target.files);
												handleFileChange(e, setPhotoPreview);
											}}
											{...rest}
										/>
										{photoPreview && (
											<div className="mt-2">
												<img
													src={photoPreview || "/placeholder.svg"}
													alt="Photo preview"
													width={200}
													height={200}
													className="rounded-md"
												/>
											</div>
										)}
									</div>
								</FormControl>
								<FormDescription>Upload your photo (max 5MB).</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="nidPhoto"
						render={({ field: { onChange, value, ...rest } }) => (
							<FormItem>
								<FormLabel>NID Photo</FormLabel>
								<FormControl>
									<div className="flex flex-col items-center">
										<Input
											type="file"
											accept=".jpg,.jpeg,.png,.webp"
											onChange={(e) => {
												onChange(e.target.files);
												handleFileChange(e, setNidPhotoPreview);
											}}
											{...rest}
										/>
										{nidPhotoPreview && (
											<div className="mt-2">
												<img
													src={nidPhotoPreview || "/placeholder.svg"}
													alt="NID Photo preview"
													width={200}
													height={200}
													className="rounded-md"
												/>
											</div>
										)}
									</div>
								</FormControl>
								<FormDescription>
									Upload your NID photo (max 5MB).
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<FormField
						control={form.control}
						name="guarantorName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Guarantor Name</FormLabel>
								<FormControl>
									<Input placeholder="Jane Doe" {...field} />
								</FormControl>
								<FormDescription>
									Enter your guarantor's full name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="guarantorId"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Guarantor ID</FormLabel>
								<FormControl>
									<Input placeholder="ID12345" {...field} />
								</FormControl>
								<FormDescription>
									Enter your guarantor's ID number.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="guarantorPhone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Guarantor Phone</FormLabel>
								<FormControl>
									<Input placeholder="9876543210" {...field} />
								</FormControl>
								<FormDescription>
									Enter your guarantor's phone number.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit">
					{isLoading ? "Please wait..." : "Submit Application"}
				</Button>
			</form>
		</Form>
	);
}
