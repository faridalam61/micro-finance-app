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
import { ArrowUpDown, Edit, Trash2, Ban, CheckCircle } from "lucide-react";

import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
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
import { Label } from "../components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";

interface User {
	id: string;
	name: string;
	phone: string;
	role: string;
	status: "active" | "blocked";
	joinDate: string;
}

const data: User[] = [
	{
		id: "1",
		name: "John Doe",
		phone: "(555) 123-4567",
		role: "Admin",
		status: "active",
		joinDate: "2023-01-15",
	},
	{
		id: "2",
		name: "Jane Smith",
		phone: "(555) 987-6543",
		role: "User",
		status: "active",
		joinDate: "2023-02-20",
	},
	{
		id: "3",
		name: "Bob Johnson",
		phone: "(555) 246-8135",
		role: "Manager",
		status: "blocked",
		joinDate: "2023-03-10",
	},
	{
		id: "4",
		name: "Alice Brown",
		phone: "(555) 369-8520",
		role: "User",
		status: "active",
		joinDate: "2023-04-05",
	},
	{
		id: "5",
		name: "Charlie Davis",
		phone: "(555) 741-9630",
		role: "Admin",
		status: "active",
		joinDate: "2023-05-12",
	},
];

export default function UsersPage() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [users, setUsers] = useState<User[]>(data);

	const [editUser, setEditUser] = useState<User | null>(null);
	const [deleteUser, setDeleteUser] = useState<User | null>(null);

	const columns: ColumnDef<User>[] = [
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
		{
			accessorKey: "name",
			header: "Name",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("name")}</div>
			),
		},
		{
			accessorKey: "phone",
			header: "Phone",
			cell: ({ row }) => <div>{row.getValue("phone")}</div>,
		},
		{
			accessorKey: "role",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Role
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("role")}</div>
			),
		},
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
					className={`capitalize ${
						row.getValue("status") === "active"
							? "text-green-600"
							: "text-red-600"
					}`}
				>
					{row.getValue("status")}
				</div>
			),
		},
		{
			accessorKey: "joinDate",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Join Date
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => <div>{row.getValue("joinDate")}</div>,
		},
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
							<Edit />
						</Button>
						{/* Delete button */}
						<Button
							variant="outline"
							size="icon"
							onClick={() => setDeleteUser(user)}
						>
							<Trash2 />
						</Button>
						{/* block unblock */}
						<Button
							variant="outline"
							size="icon"
							onClick={() => handleBlockUnblock(user)}
						>
							{user.status === "active" ? (
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

	const handleBlockUnblock = (user: User) => {
		setUsers((prevUsers) =>
			prevUsers.map((u) =>
				u.id === user.id
					? { ...u, status: u.status === "active" ? "blocked" : "active" }
					: u
			)
		);
	};

	const handleSaveEdit = (editedUser: User) => {
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
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter names..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
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

const EditUserDialog = ({
	user,
	onClose,
	onSave,
}: {
	user: User | null;
	onClose: () => void;
	onSave: (user: User) => void;
}) => {
	const [editedUser, setEditedUser] = useState<User | null>(user);

	if (!editedUser) return null;

	const handleSave = () => {
		onSave(editedUser);
		onClose();
	};

	return (
		<Dialog open={!!user} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Name
						</Label>
						<Input
							id="name"
							value={editedUser.name}
							onChange={(e) =>
								setEditedUser({ ...editedUser, name: e.target.value })
							}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="phone" className="text-right">
							Phone
						</Label>
						<Input
							id="phone"
							value={editedUser.phone}
							onChange={(e) =>
								setEditedUser({ ...editedUser, phone: e.target.value })
							}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="role" className="text-right">
							Role
						</Label>
						<Select
							value={editedUser.role}
							onValueChange={(value) =>
								setEditedUser({ ...editedUser, role: value })
							}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select a role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Admin">Admin</SelectItem>
								<SelectItem value="User">User</SelectItem>
								<SelectItem value="Manager">Manager</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="status" className="text-right">
							Status
						</Label>
						<Select
							value={editedUser.status}
							onValueChange={(value: "active" | "blocked") =>
								setEditedUser({ ...editedUser, status: value })
							}
						>
							<SelectTrigger className="col-span-3">
								<SelectValue placeholder="Select a status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="blocked">Blocked</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="joinDate" className="text-right">
							Join Date
						</Label>
						<Input
							id="joinDate"
							type="date"
							value={editedUser.joinDate}
							onChange={(e) =>
								setEditedUser({ ...editedUser, joinDate: e.target.value })
							}
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit" onClick={handleSave}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

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
