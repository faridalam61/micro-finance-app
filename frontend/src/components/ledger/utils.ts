import type { Transaction, DateRange } from "./types";

export const filterTransactions = (
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

export const calculateBalance = (transactions: Transaction[]) => {
	return transactions.reduce((acc, transaction) => {
		if (transaction.type === "cash in" || transaction.type === "investment") {
			return acc + transaction.amount!;
		} else {
			return acc - transaction.amount!;
		}
	}, 0);
};
