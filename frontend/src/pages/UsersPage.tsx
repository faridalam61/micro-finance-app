import { useEffect, useState } from "react";
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
	DialogTrigger,
} from "../components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { UserRegistrationForm } from "../components/create-new-user-form";
import {
	TUser,
	useDeleteUserMutation,
	useGetAllUsersQuery,
	useUpdateUserMutation,
} from "../redux/feature/user/userApi";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/ui/form";

export default function UsersPage() {
	const { data, isLoading, refetch } = useGetAllUsersQuery(undefined);
	const [deleteUsers] = useDeleteUserMutation();
	const [updateUser] = useUpdateUserMutation();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [users, setUsers] = useState<TUser[]>(data ?? []);

	const [editUser, setEditUser] = useState<TUser | null>(null);
	const [deleteUser, setDeleteUser] = useState<TUser | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const columns: ColumnDef<TUser>[] = [
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
				<div className="capitalize ml-0 md:ml-4">{row.getValue("role")}</div>
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
					className={`capitalize ml-0 md:ml-4 ${
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
			accessorKey: "createdAt",
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
			cell: ({ row }) => (
				<div className="ml-0 md:ml-4">{row.getValue("createdAt")}</div>
			),
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
							onClick={() => handleBlockUnblock(user._id, user.status)}
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
	useEffect(() => {
		if (data) {
			setUsers(data.data);
		}
	}, [data]);
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

	const handleBlockUnblock = async (id: string, currentStatus: string) => {
		try {
			// Determine the new status based on the current status
			const newStatus = currentStatus === "active" ? "blocked" : "active";
			const data = { status: newStatus };

			// Call the updateUser mutation
			const res = await updateUser({
				id,
				payload: data,
			}).unwrap();

			console.log(id, data);
			if (res.error) {
				toast.error(
					`Unable to ${newStatus === "blocked" ? "block" : "unblock"} user`
				);
			} else {
				toast.success(
					`User ${
						newStatus === "blocked" ? "blocked" : "unblocked"
					} successfully`
				);
				refetch(); // Refresh the user list
			}
		} catch (err) {
			toast.error(
				`Unable to ${currentStatus === "active" ? "block" : "unblock"} user`
			);
		}
	};

	const handleSaveEdit = (editedUser: TUser) => {
		setUsers((prevUsers) =>
			prevUsers.map((user) => (user._id === editedUser._id ? editedUser : user))
		);
		setEditUser(null);
	};

	const handleConfirmDelete = async (id: string) => {
		if (deleteUser) {
			const res = await deleteUsers(id);
			if (res.error) {
				toast.error("Failed to delete user");
			} else {
				setDeleteUser(null);
				refetch();
				toast.success("User deleted successfully");
			}
		}
	};
	const handleUserCreated = () => {
		refetch();
	};
	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className="w-full p-4">
			<div className="flex items-center justify-between py-4">
				<Input
					placeholder="Filter names..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				{/* Add new user dialog */}
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button variant="outline">Create user</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Register new user</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<UserRegistrationForm
								onSuccess={() => {
									handleUserCreated(); // Refresh data
									setIsDialogOpen(false); // Close the dialog
								}}
							/>
						</div>
					</DialogContent>
				</Dialog>
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
				onConfirm={() => handleConfirmDelete(deleteUser?._id as string)}
				title="Confirm Delete"
				description={
					<span>
						Are you sure you want to delete{" "}
						<strong style={{ color: "red" }}>{deleteUser?.name}</strong>?
					</span>
				}
			/>
		</div>
	);
}
const EditUserDialog = ({
	user,
	onClose,
	onSave,
}: {
	user: TUser | null;
	onClose: () => void;
	onSave: (user: TUser) => void;
}) => {
	const [updateUser, { isLoading }] = useUpdateUserMutation();

	const form = useForm<TUser>({
		defaultValues: user || {
			_id: "",
			name: "",
			phone: "",
			role: "user",
			status: "active",
			createdAt: "",
		},
	});

	useEffect(() => {
		if (user) {
			form.reset(user);
		}
	}, [user, form]);

	const handleSave = async (updatedData: TUser) => {
		await updateUser({ id: updatedData._id, payload: updatedData });

		onSave(updatedData);
		onClose();
	};

	if (!user) return null;

	return (
		<Dialog open={!!user} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit User</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Select a role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="admin">Admin</SelectItem>
											<SelectItem value="user">User</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="status"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<SelectTrigger>
											<SelectValue placeholder="Select a status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="active">Active</SelectItem>
											<SelectItem value="blocked">Blocked</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" className="w-full">
								{isLoading ? "Saving..." : "Save changes"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
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
	description: React.ReactNode;
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
