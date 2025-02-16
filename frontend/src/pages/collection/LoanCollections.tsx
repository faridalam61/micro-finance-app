import { useState, useEffect } from "react";
import { Installment } from "../../components/types";
import { InstallmentTable } from "../../components/collected-installments";

// Simulated database fetch function
const fetchInstallments = async (): Promise<Installment[]> => {
	// In a real application, this would be an API call to your backend
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: "1",
					date: "2025-02-14",
					name: "John Doe",
					description: "First payment",
					amount: 500,
				},
				{
					id: "2",
					date: "2023-05-15",
					name: "Jane Smith",
					description: "Second payment",
					amount: 750,
				},
				{
					id: "3",
					date: "2023-06-01",
					name: "Bob Johnson",
					description: "Third payment",
					amount: 1000,
				},
				{
					id: "4",
					date: "2023-06-15",
					name: "Alice Brown",
					description: "Fourth payment",
					amount: 600,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
				{
					id: "5",
					date: "2023-07-01",
					name: "Charlie Davis",
					description: "Fifth payment",
					amount: 850,
				},
			]);
		}, 500); // Simulate network delay
	});
};

export default function LoanCollections() {
	const [installments, setInstallments] = useState<Installment[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadInstallments = async () => {
			setIsLoading(true);
			const data = await fetchInstallments();
			setInstallments(data);
			setIsLoading(false);
		};

		loadInstallments();
	}, []);

	return (
		<div className="container mx-auto py-5">
			<h1 className="text-3xl px-4 font-bold mb-8">Installment Collection</h1>
			{isLoading ? (
				<p>Loading installments...</p>
			) : (
				<InstallmentTable installments={installments} />
			)}
		</div>
	);
}
