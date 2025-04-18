import FileSaver from "file-saver";
import { utils, write } from "xlsx";
import { jsPDF } from "jspdf";
import { Transaction } from "./types";
import autoTable from "jspdf-autotable";

export const exportToCSV = (transactions: Transaction[]) => {
	const worksheet = utils.json_to_sheet(transactions);
	const workbook = utils.book_new();
	utils.book_append_sheet(workbook, worksheet, "Transactions");
	const excelBuffer = write(workbook, { bookType: "csv", type: "array" });
	const data = new Blob([excelBuffer], { type: "text/csv;charset=utf-8;" });
	FileSaver.saveAs(data, "transactions.csv");
};
export const exportToPDF = (transactions: Transaction[], balance: number) => {
	const doc = new jsPDF();
	const time = new Date().toLocaleString();
	const pageWidth = doc.internal.pageSize.getWidth();
	const textWidth = doc.getTextWidth(time); // Get text width
	const x = (pageWidth - textWidth) / 2;
	// Title
	doc.text("Transaction Report", x, 10);
	doc.text(time, x, 20);

	// Calculate totals
	const totalDebit = transactions.reduce((sum, t) => sum + t.debit, 0);
	const totalCredit = transactions.reduce((sum, t) => sum + t.credit, 0);

	// Generate table
	autoTable(doc, {
		startY: 25,
		head: [["Date", "Description", "Type", "Debit", "Credit"]],
		body: [
			...transactions.map((t) => [
				t.date,
				t.description,
				t.type,
				t.debit.toFixed(2),
				t.credit.toFixed(2),
			]),
			// Add Total Row
			["", "", "Total", totalDebit.toFixed(2), totalCredit.toFixed(2)],
		],
		// Add styles for the last row (optional)
		// foot: [["", "", "Total", totalDebit.toFixed(2), totalCredit.toFixed(2)]],
		theme: "grid",
		styles: { fontSize: 10 },
		headStyles: { fillColor: [22, 160, 133] }, // Green header
		footStyles: { fillColor: [22, 160, 133] },
	});

	//Get last Y position
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const finalY = (doc as any).lastAutoTable.finalY || 30;
	doc.text(`Balance: ${balance.toFixed(2)}`, 14, finalY + 10);

	// Save PDF
	doc.save("transactions.pdf");
};
