export type TLedger = {
	transectionType: "expense" | "cash in" | "cash out" | "withdraw" | "invest";
	description: string;
	debit: number;
	credit: number;
	balance: number;
};
