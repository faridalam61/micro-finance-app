"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";

interface User {
	id: string;
	name: string;
	phone: string;
	role: string;
}

interface EditUserDialogProps {
	user: User | null;
	onClose: () => void;
	onSave: (user: User) => void;
}

export const EditUserDialog: React.FC<EditUserDialogProps> = ({
	user,
	onClose,
	onSave,
}) => {
	const [editedUser, setEditedUser] = useState<User | null>(null);

	useEffect(() => {
		setEditedUser(user);
	}, [user]);

	if (!editedUser) return null;

	const handleSave = () => {
		onSave(editedUser);
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
