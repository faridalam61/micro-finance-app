"use client";

import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { useForm, Controller } from "react-hook-form";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Transaction } from "./types";

interface NewEntryFormProps {
	onSubmit: (transaction: Omit<Transaction, "id">) => void;
}

export const NewEntryForm: React.FC<NewEntryFormProps> = ({ onSubmit }) => {
	const [open, setOpen] = React.useState(false);
	const [showConfirmation, setShowConfirmation] = React.useState(false);
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<Omit<Transaction, "id">>();

	const onSubmitForm = (_data: Omit<Transaction, "id">) => {
		setShowConfirmation(true);
	};

	const handleConfirm = () => {
		handleSubmit((data) => {
			onSubmit(data);
			setOpen(false);
			setShowConfirmation(false);
			reset();
		})();
	};

	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>Add New Entry</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Transaction</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
						<div>
							<Input
								{...register("date", { required: "Date is required" })}
								type="date"
								placeholder="Date"
							/>
							{errors.date && (
								<p className="text-red-500 text-sm">{errors.date.message}</p>
							)}
						</div>
						<div>
							<Input
								{...register("description", {
									required: "Description is required",
								})}
								placeholder="Description"
							/>
							{errors.description && (
								<p className="text-red-500 text-sm">
									{errors.description.message}
								</p>
							)}
						</div>
						<div>
							<Input
								{...register("debit", {
									valueAsNumber: true,
									validate: (value) =>
										value >= 0 || "Debit must be a positive number",
								})}
								type="number"
								step="0.01"
								placeholder="Debit"
							/>
							{errors.debit && (
								<p className="text-red-500 text-sm">{errors.debit.message}</p>
							)}
						</div>
						<div>
							<Input
								{...register("credit", {
									valueAsNumber: true,
									validate: (value) =>
										value >= 0 || "Credit must be a positive number",
								})}
								type="number"
								step="0.01"
								placeholder="Credit"
							/>
							{errors.credit && (
								<p className="text-red-500 text-sm">{errors.credit.message}</p>
							)}
						</div>
						<Controller
							name="type"
							control={control}
							rules={{ required: "Transaction type is required" }}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Select type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="expense">Expense</SelectItem>
										<SelectItem value="investment">Investment</SelectItem>
										<SelectItem value="cash out">Cash Out</SelectItem>
										<SelectItem value="cash in">Cash In</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.type && (
							<p className="text-red-500 text-sm">{errors.type.message}</p>
						)}
						<DialogFooter>
							<Button type="submit">Submit</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>

			<AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Confirm New Transaction</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to add this transaction?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setShowConfirmation(false)}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirm}>
							Confirm
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
