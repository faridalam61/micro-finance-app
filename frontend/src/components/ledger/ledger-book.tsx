"use client";

import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "../../components/ui/table";

import React from "react";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "../../components/ui/button";
import { DateRange, Transaction } from "./types";
import { NewEntryForm } from "./new-entry-form";
import { exportToCSV, exportToPDF } from "./export-function";
import { FilterComponents } from "./filter-component";

const initialTransactions: Transaction[] = [
	{
		id: 1,
		date: "2023-06-01",
		description: "Initial Balance",
		debit: 0,
		credit: 1000,
		type: "cash in",
	},
	{
		id: 2,
		date: "2023-06-02",
		description: "Grocery Shopping",
		debit: 150,
		credit: 0,
		type: "expense",
	},
	// ... add more initial transactions
];

const filterTransactions = (
	transactions: Transaction[],
	type: string | undefined,
	dateRange: DateRange
) => {
	return transactions.filter((transaction) => {
		const typeMatch = !type || transaction.type === type;
		const dateMatch =
			(!dateRange.from || new Date(transaction.date) >= dateRange.from) &&
			(!dateRange.to || new Date(transaction.date) <= dateRange.to);
		return typeMatch && dateMatch;
	});
};

export default function LedgerBook() {
	const [transactions, setTransactions] =
		React.useState<Transaction[]>(initialTransactions);
	const [filteredTransactions, setFilteredTransactions] =
		React.useState<Transaction[]>(transactions);
	const [selectedType, setSelectedType] = React.useState<string | undefined>(
		undefined
	);
	const [dateRange, setDateRange] = React.useState<DateRange>({
		from: undefined,
		to: undefined,
	});

	React.useEffect(() => {
		setFilteredTransactions(
			filterTransactions(transactions, selectedType, dateRange)
		);
	}, [transactions, selectedType, dateRange]);

	const handleNewEntry = (newTransaction: Omit<Transaction, "id">) => {
		const transactionWithId = {
			...newTransaction,
			id: transactions.length + 1,
		};
		setTransactions([...transactions, transactionWithId]);
		console.log("New transaction added:", transactionWithId);
	};

	const resetFilters = () => {
		setSelectedType(undefined);
		setDateRange({ from: undefined, to: undefined });
	};

	const calculateBalance = (transactions: Transaction[]) => {
		return transactions.reduce(
			(acc, transaction) => acc + transaction.credit - transaction.debit,
			0
		);
	};

	const balance = calculateBalance(filteredTransactions);

	return (
		<div className="p-4">
			<div className="flex justify-between mb-4">
				<NewEntryForm onSubmit={handleNewEntry} />
				<div>
					<Button
						onClick={() => exportToCSV(filteredTransactions)}
						className="mr-2"
					>
						Export CSV
					</Button>
					<Button onClick={() => exportToPDF(filteredTransactions)}>
						Export PDF
					</Button>
				</div>
			</div>

			<FilterComponents
				onTypeChange={setSelectedType}
				onDateRangeChange={setDateRange}
				onReset={resetFilters}
			/>

			<div className="rounded-md border">
				<div className="w-full">
					<table className="w-full caption-bottom text-sm">
						<TableHeader>
							<TableRow>
								<TableHead className="w-[120px]">Date</TableHead>
								<TableHead>Description</TableHead>
								<TableHead className="w-[100px] text-right">Debit</TableHead>
								<TableHead className="w-[100px] text-right">Credit</TableHead>
								<TableHead className="w-[120px] text-right">Balance</TableHead>
							</TableRow>
						</TableHeader>
					</table>
				</div>
				<ScrollArea className="h-[60vh]">
					<div className="w-full">
						<table className="w-full caption-bottom text-sm">
							<TableBody>
								{filteredTransactions.map((transaction, index) => {
									const runningBalance = filteredTransactions
										.slice(0, index + 1)
										.reduce((acc, t) => acc + t.credit - t.debit, 0);

									return (
										<TableRow key={transaction.id}>
											<TableCell className="w-[120px]">
												{transaction.date}
											</TableCell>
											<TableCell className="max-w-[300px] truncate">
												{transaction.description}
											</TableCell>
											<TableCell className="w-[100px] text-right">
												{transaction.debit > 0
													? `$${transaction.debit.toFixed(2)}`
													: "-"}
											</TableCell>
											<TableCell className="w-[100px] text-right">
												{transaction.credit > 0
													? `$${transaction.credit.toFixed(2)}`
													: "-"}
											</TableCell>
											<TableCell className="w-[120px] text-right">
												${runningBalance.toFixed(2)}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</table>
					</div>
				</ScrollArea>
			</div>
			<div className="text-right mt-4 font-semibold">
				Current Balance: ${balance.toFixed(2)}
			</div>
		</div>
	);
}
