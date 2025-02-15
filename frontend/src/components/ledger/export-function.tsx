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

export const exportToPDF = (transactions: Transaction[]) => {
	const doc = new jsPDF();
	doc.text("Transaction Report", 14, 15);
	autoTable(doc, {
		head: [["Date", "Description", "Amount", "Type"]],
		body: transactions.map((t) => [
			t.date,
			t.description,
			t.amount!.toFixed(2),
			t.type,
		]),
	});
	doc.save("transactions.pdf");
};
