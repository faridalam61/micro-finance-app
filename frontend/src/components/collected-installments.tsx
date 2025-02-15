import { useState, useMemo } from "react";
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type ColumnDef,
	flexRender,
	type FilterFn,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../components/ui/popover";
import type { Installment } from "./types";
import { format } from "date-fns";

interface InstallmentTableProps {
	installments: Installment[];
}

export function InstallmentTable({ installments }: InstallmentTableProps) {
	const [filterType, setFilterType] = useState("all");
	const [customStartDate, setCustomStartDate] = useState<Date | undefined>(
		undefined
	);
	const [customEndDate, setCustomEndDate] = useState<Date | undefined>(
		undefined
	);

	const columns = useMemo<ColumnDef<Installment>[]>(
		() => [
			{ accessorKey: "date", header: "Date" },
			{ accessorKey: "name", header: "Name" },
			{ accessorKey: "description", header: "Description" },
			{
				accessorKey: "amount",
				header: "Amount",
				cell: ({ getValue }) => `$${(getValue() as number).toFixed(2)}`,
			},
		],
		[]
	);

	const filterData: FilterFn<Installment> = (row, _columnId, filterValue) => {
		const today = new Date();
		const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
		const oneMonthAgo = new Date(
			today.getFullYear(),
			today.getMonth() - 1,
			today.getDate()
		);
		const rowDate = new Date(row.original.date);

		switch (filterValue) {
			case "day":
				return rowDate.toDateString() === today.toDateString();
			case "week":
				return rowDate >= oneWeekAgo && rowDate <= today;
			case "month":
				return rowDate >= oneMonthAgo && rowDate <= today;
			case "custom":
				const start = customStartDate || new Date(0);
				const end = customEndDate || new Date();
				return rowDate >= start && rowDate <= end;
			default:
				return true;
		}
	};

	const table = useReactTable({
		data: installments,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		globalFilterFn: filterData,
	});

	const filteredRows = table.getFilteredRowModel().rows;
	const total = filteredRows.reduce(
		(sum, row) => sum + (row.original.amount as number),
		0
	);

	return (
		<div>
			<div className="flex items-center space-x-4 mb-4">
				<Button
					variant={filterType === "all" ? "default" : "outline"}
					onClick={() => {
						setFilterType("all");
						table.setGlobalFilter(undefined);
					}}
				>
					All
				</Button>
				<Button
					variant={filterType === "day" ? "default" : "outline"}
					onClick={() => {
						setFilterType("day");
						table.setGlobalFilter("day");
					}}
				>
					Today
				</Button>
				<Button
					variant={filterType === "week" ? "default" : "outline"}
					onClick={() => {
						setFilterType("week");
						table.setGlobalFilter("week");
					}}
				>
					This Week
				</Button>
				<Button
					variant={filterType === "month" ? "default" : "outline"}
					onClick={() => {
						setFilterType("month");
						table.setGlobalFilter("month");
					}}
				>
					This Month
				</Button>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant={filterType === "custom" ? "default" : "outline"}>
							Custom Range
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="range"
							selected={{
								from: customStartDate,
								to: customEndDate,
							}}
							onSelect={(range) => {
								setCustomStartDate(range?.from);
								setCustomEndDate(range?.to);
								setFilterType("custom");
								table.setGlobalFilter("custom");
							}}
							numberOfMonths={2}
						/>
					</PopoverContent>
				</Popover>
			</div>
			{filterType === "custom" && customStartDate && customEndDate && (
				<div className="mb-4">
					<span className="font-medium">
						{format(customStartDate, "PP")} - {format(customEndDate, "PP")}
					</span>
				</div>
			)}
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{flexRender(
										header.column.columnDef.header,
										header.getContext()
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{filteredRows.map((row) => (
						<TableRow key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="mt-4 text-right">
				<strong>Total: ${total.toFixed(2)}</strong>
			</div>
		</div>
	);
}
