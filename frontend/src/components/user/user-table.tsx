"use client";

import { useState, useCallback } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Edit, Trash2, Ban } from "lucide-react";

interface User {
	id: string;
	name: string;
	phone: string;
	role: string;
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

export default function UserTable() {
	const [users, setUsers] = useState<User[]>([
		{ id: "1", name: "John Doe", phone: "(555) 123-4567", role: "Admin" },
		{ id: "2", name: "Jane Smith", phone: "(555) 987-6543", role: "User" },
		{ id: "3", name: "Bob Johnson", phone: "(555) 246-8135", role: "Manager" },
		{ id: "4", name: "Alice Brown", phone: "(555) 369-8520", role: "User" },
		{ id: "5", name: "Charlie Davis", phone: "(555) 741-9630", role: "Admin" },
	]);

	const [editUser, setEditUser] = useState<User | null>(null);
	const [deleteUser, setDeleteUser] = useState<User | null>(null);
	const [blockUser, setBlockUser] = useState<User | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState<string>("All");

	const handleEdit = useCallback((user: User) => {
		setEditUser(user);
	}, []);

	const handleDelete = useCallback((user: User) => {
		setDeleteUser(user);
	}, []);

	const handleBlock = useCallback((user: User) => {
		setBlockUser(user);
	}, []);

	const handleSaveEdit = useCallback((editedUser: User) => {
		setUsers((prevUsers) =>
			prevUsers.map((user) => (user.id === editedUser.id ? editedUser : user))
		);
		setEditUser(null);
	}, []);

	const handleConfirmDelete = useCallback(() => {
		if (deleteUser) {
			setUsers((prevUsers) =>
				prevUsers.filter((user) => user.id !== deleteUser.id)
			);
			setDeleteUser(null);
		}
	}, [deleteUser]);

	const handleConfirmBlock = useCallback(() => {
		if (blockUser) {
			// Implement block logic here
			console.log(`Blocked user: ${blockUser.name}`);
			setBlockUser(null);
		}
	}, [blockUser]);

	const filteredUsers = users.filter(
		(user) =>
			(roleFilter === "All" || user.role === roleFilter) &&
			(user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user.phone.includes(searchTerm))
	);

	return (
		<div className="container mx-auto py-10">
			<div className="flex justify-between mb-4">
				<Input
					placeholder="Search by name or phone"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="max-w-sm"
				/>
				<Select value={roleFilter} onValueChange={setRoleFilter}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by role" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="All">All Roles</SelectItem>
						<SelectItem value="Admin">Admin</SelectItem>
						<SelectItem value="User">User</SelectItem>
						<SelectItem value="Manager">Manager</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{filteredUsers.map((user) => (
						<TableRow key={user.id}>
							<TableCell className="font-medium">{user.name}</TableCell>
							<TableCell>{user.phone}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell>
								<div className="flex space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(user)}
									>
										<Edit className="h-4 w-4 mr-2" />
										Edit
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleDelete(user)}
									>
										<Trash2 className="h-4 w-4 mr-2" />
										Delete
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleBlock(user)}
									>
										<Ban className="h-4 w-4 mr-2" />
										Block
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

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
			<ConfirmationDialog
				isOpen={!!blockUser}
				onClose={() => setBlockUser(null)}
				onConfirm={handleConfirmBlock}
				title="Confirm Block"
				description={`Are you sure you want to block ${blockUser?.name}?`}
			/>
		</div>
	);
}
