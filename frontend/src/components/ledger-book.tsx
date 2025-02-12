"use client";

import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";

import { ScrollArea } from "../components/ui/scroll-area";

interface Transaction {
	id: number;
	date: string;
	description: string;
	debit: number;
	credit: number;
}

const transactions: Transaction[] = [
	{
		id: 1,
		date: "2023-06-01",
		description: "Initial Balance",
		debit: 0,
		credit: 1000,
	},
	{
		id: 2,
		date: "2023-06-02",
		description: "Grocery Shopping",
		debit: 150,
		credit: 0,
	},
	{
		id: 3,
		date: "2023-06-03",
		description: "Salary Deposit",
		debit: 0,
		credit: 2000,
	},
	{
		id: 4,
		date: "2023-06-04",
		description: "Electricity Bill",
		debit: 80,
		credit: 0,
	},
	{
		id: 5,
		date: "2023-06-05",
		description: "Online Purchase",
		debit: 200,
		credit: 0,
	},
	// Add more transactions to see the scroll effect
	...Array.from({ length: 20 }, (_, i) => ({
		id: i + 6,
		date: `2023-06-${(i + 6).toString().padStart(2, "0")}`,
		description: `Transaction ${i + 6}`,
		debit: Math.random() > 0.5 ? Math.floor(Math.random() * 500) : 0,
		credit: Math.random() > 0.5 ? Math.floor(Math.random() * 1000) : 0,
	})),
];

export default function LedgerBook() {
	const [balance, setBalance] = React.useState(0);

	React.useEffect(() => {
		const newBalance = transactions.reduce((acc, transaction) => {
			return acc + transaction.credit - transaction.debit;
		}, 0);
		setBalance(newBalance);
	}, []);

	return (
		<>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Date</TableHead>
							<TableHead>Description</TableHead>
							<TableHead className="text-right">Debit</TableHead>
							<TableHead className="text-right">Credit</TableHead>
							<TableHead className="text-right">Balance</TableHead>
						</TableRow>
					</TableHeader>
				</Table>
				<ScrollArea className="h-[72vh]">
					<Table>
						<TableBody>
							{transactions.map((transaction, index) => {
								const runningBalance = transactions
									.slice(0, index + 1)
									.reduce((acc, t) => acc + t.credit - t.debit, 0);

								return (
									<TableRow key={transaction.id}>
										<TableCell className="w-[100px]">
											{transaction.date}
										</TableCell>
										<TableCell>{transaction.description}</TableCell>
										<TableCell className="text-right">
											{transaction.debit > 0
												? `$${transaction.debit.toFixed(2)}`
												: "-"}
										</TableCell>
										<TableCell className="text-right">
											{transaction.credit > 0
												? `$${transaction.credit.toFixed(2)}`
												: "-"}
										</TableCell>
										<TableCell className="text-right">
											${runningBalance.toFixed(2)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</ScrollArea>
			</div>
			<div className="text-right mt-4 font-semibold">
				Current Balance: ${balance.toFixed(2)}
			</div>
		</>
	);
}
