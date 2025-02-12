import { Button } from "../../components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";
import { Edit, Trash2, Ban } from "lucide-react";

interface User {
	id: string;
	name: string;
	phone: string;
	role: string;
}

const users: User[] = [
	{ id: "1", name: "John Doe", phone: "+1 234 567 8901", role: "Admin" },
	{ id: "2", name: "Jane Smith", phone: "+1 234 567 8902", role: "User" },
	{ id: "3", name: "Bob Johnson", phone: "+1 234 567 8903", role: "Manager" },
];

export default function UserList() {
	const handleEdit = (id: string) => {
		console.log(`Edit user with id: ${id}`);
	};

	const handleDelete = (id: string) => {
		console.log(`Delete user with id: ${id}`);
	};

	const handleBlock = (id: string) => {
		console.log(`Block user with id: ${id}`);
	};

	return (
		<div className="container mx-auto py-10">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell className="font-medium">{user.name}</TableCell>
							<TableCell>{user.phone}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell>
								<div className="flex space-x-2">
									<Button
										variant="outline"
										size="icon"
										onClick={() => handleEdit(user.id)}
									>
										<Edit className="h-4 w-4" />
										<span className="sr-only">Edit</span>
									</Button>
									<Button
										variant="outline"
										size="icon"
										onClick={() => handleDelete(user.id)}
									>
										<Trash2 className="h-4 w-4" />
										<span className="sr-only">Delete</span>
									</Button>
									<Button
										variant="outline"
										size="icon"
										onClick={() => handleBlock(user.id)}
									>
										<Ban className="h-4 w-4" />
										<span className="sr-only">Block</span>
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
