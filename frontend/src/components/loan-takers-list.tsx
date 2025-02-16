import { useState } from "react";
import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Ban, CheckCircle, Eye } from "lucide-react";

import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../components/ui/dialog";

interface LoanTakers {
	id: string;
	disburseDate: string;
	name: string;
	phone: string;
	loanAmount: number;
	remainingAmount: number;
	status: "paid" | "pending" | "on hold";
}

const data: LoanTakers[] = [
	{
		id: "1",
		disburseDate: "2023-01-15",
		name: "John Doe John",
		phone: "(555) 123-4567",
		loanAmount: 10000,
		remainingAmount: 0,
		status: "paid",
	},
	{
		id: "2",
		disburseDate: "2023-01-15",
		name: "John Doe",
		phone: "(555) 123-4567",
		loanAmount: 10000,
		remainingAmount: 5000,
		status: "pending",
	},
	{
		id: "3",
		disburseDate: "2023-01-15",
		name: "John Doe",
		phone: "(555) 123-4567",
		loanAmount: 10000,
		remainingAmount: 3000,
		status: "on hold",
	},
];

export default function LoanTakersList() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [users, setUsers] = useState<LoanTakers[]>(data);

	const [editUser, setEditUser] = useState<LoanTakers | null>(null);
	const [deleteUser, setDeleteUser] = useState<LoanTakers | null>(null);

	const columns: ColumnDef<LoanTakers>[] = [
		// Select id
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},

		// Disburse date

		{
			accessorKey: "disburseDate",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Disburse Date
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="ml-4">{row.getValue("disburseDate")}</div>
			),
		},

		// Name
		{
			accessorKey: "name",
			header: "Name",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("name")}</div>
			),
		},

		// Phone
		{
			accessorKey: "phone",
			header: "Phone",
			cell: ({ row }) => <div>{row.getValue("phone")}</div>,
		},

		// Loan amount
		{
			accessorKey: "loanAmount",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Loan Amount
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize ml-4">{row.getValue("loanAmount")}</div>
			),
		},

		// Remaining amount

		{
			accessorKey: "remainingAmount",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Remaining
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize ml-4">{row.getValue("remainingAmount")}</div>
			),
		},

		// Loan status
		{
			accessorKey: "status",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Status
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div
					className={`capitalize ml-4 ${
						row.getValue("status") === "active"
							? "text-green-600"
							: "text-red-600"
					}`}
				>
					{row.getValue("status")}
				</div>
			),
		},

		// Actions
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const user = row.original;

				return (
					<div className="flex justify-end space-x-2">
						{/* Edit button */}
						<Button
							variant="outline"
							size="icon"
							onClick={() => setEditUser(user)}
						>
							<Eye />
						</Button>

						{/* Not collection able or collectionable */}
						<Button
							variant="outline"
							size="icon"
							onClick={() => handleBlockUnblock(user)}
						>
							{user.status === "pending" || user.status === "on hold" ? (
								<>
									<Ban />
								</>
							) : (
								<>
									<CheckCircle />
								</>
							)}
						</Button>
					</div>
				);
			},
		},
	];

	const table = useReactTable({
		data: users,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const handleBlockUnblock = (user: LoanTakers) => {
		setUsers((prevUsers) =>
			prevUsers.map((u) =>
				u.id === user.id
					? { ...u, status: u.status === "pending" ? "on hold" : "pending" }
					: u
			)
		);
	};

	const handleSaveEdit = (editedUser: LoanTakers) => {
		setUsers((prevUsers) =>
			prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
		);
		setEditUser(null);
	};

	const handleConfirmDelete = () => {
		if (deleteUser) {
			setUsers((prevUsers) =>
				prevUsers.filter((user) => user.id !== deleteUser.id)
			);
			setDeleteUser(null);
		}
	};

	return (
		<div className="w-full p-4">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter names..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Button variant="outline" className="ml-auto">
					Disburse Loan
				</Button>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
			<EditUserDialog
				user={editUser}
				onClose={() => setEditUser(null)}
				onSave={handleSaveEdit}
			/>
			<ConfirmationDialog
				isOpen={!!deleteUser}
				onClose={() => setDeleteUser(null)}
				onConfirm={handleConfirmDelete}
				title="Confirm Delete"
				description={`Are you sure you want to delete ${deleteUser?.name}?`}
			/>
		</div>
	);
}

// View loan details modal

const EditUserDialog = ({
	user,
	onClose,
	onSave,
}: {
	user: LoanTakers | null;
	onClose: () => void;
	onSave: (user: LoanTakers) => void;
}) => {
	const [editedUser, _setEditedUser] = useState<LoanTakers | null>(user);

	if (!editedUser) return null;

	const handleSave = () => {
		onSave(editedUser);
		onClose();
	};

	return (
		<Dialog open={!!user} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>View Details</DialogTitle>
				</DialogHeader>
				<h2>Pending</h2>
				<DialogFooter>
					<Button type="submit" onClick={handleSave}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

// Loan not collectionable confirmation
const ConfirmationDialog = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	description,
}: {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description: string;
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
