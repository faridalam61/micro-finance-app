export type TransactionType =
	| "expense"
	| "investment"
	| "cash out"
	| "cash in"
	| "other";

export interface Transaction {
	id: number;
	date: string;
	description: string;
	debit: number;
	credit: number;
	type: TransactionType;
	amount?: number;
}

export interface DateRange {
	from: Date | undefined;
	to: Date | undefined;
}
