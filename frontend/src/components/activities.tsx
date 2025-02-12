import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { UserX, DollarSign, Activity } from "lucide-react";

// Define the structure of an activity item
interface ActivityItem {
	id: string;
	type: "deletion" | "balance_update" | "other";
	actor: string;
	target: string;
	details?: string;
	timestamp: string;
}

// Sample activity data
const activityData: ActivityItem[] = [
	{
		id: "1",
		type: "deletion",
		actor: "John Doe",
		target: "Jane Smith",
		timestamp: "2023-06-15T10:30:00Z",
	},
	{
		id: "2",
		type: "balance_update",
		actor: "Alice Johnson",
		target: "Bob Williams",
		details: "$500",
		timestamp: "2023-06-15T11:45:00Z",
	},
	{
		id: "3",
		type: "other",
		actor: "Emma Davis",
		target: "System",
		details: "Updated profile picture",
		timestamp: "2023-06-15T13:15:00Z",
	},
	{
		id: "2",
		type: "balance_update",
		actor: "Alice Johnson",
		target: "Bob Williams",
		details: "$500",
		timestamp: "2023-06-15T11:45:00Z",
	},
	{
		id: "1",
		type: "deletion",
		actor: "John Doe",
		target: "Jane Smith",
		timestamp: "2023-06-15T10:30:00Z",
	},
	{
		id: "1",
		type: "deletion",
		actor: "John Doe",
		target: "Jane Smith",
		timestamp: "2023-06-15T10:30:00Z",
	},
	{
		id: "2",
		type: "balance_update",
		actor: "Alice Johnson",
		target: "Bob Williams",
		details: "$500",
		timestamp: "2023-06-15T11:45:00Z",
	},
	{
		id: "3",
		type: "other",
		actor: "Emma Davis",
		target: "System",
		details: "Updated profile picture",
		timestamp: "2023-06-15T13:15:00Z",
	},
	{
		id: "2",
		type: "balance_update",
		actor: "Alice Johnson",
		target: "Bob Williams",
		details: "$500",
		timestamp: "2023-06-15T11:45:00Z",
	},
	{
		id: "1",
		type: "deletion",
		actor: "John Doe",
		target: "Jane Smith",
		timestamp: "2023-06-15T10:30:00Z",
	},
	// Add more activity items as needed
];

const ActivityIcon = ({ type }: { type: ActivityItem["type"] }) => {
	switch (type) {
		case "deletion":
			return <UserX className="h-4 w-4 text-red-500" />;
		case "balance_update":
			return <DollarSign className="h-4 w-4 text-green-500" />;
		default:
			return <Activity className="h-4 w-4 text-blue-500" />;
	}
};

const ActivityDescription = ({ item }: { item: ActivityItem }) => {
	switch (item.type) {
		case "deletion":
			return (
				<span>
					<strong>{item.actor}</strong> deleted user{" "}
					<strong>{item.target}</strong>
				</span>
			);
		case "balance_update":
			return (
				<span>
					<strong>{item.actor}</strong> updated balance of{" "}
					<strong>{item.target}</strong> to {item.details}
				</span>
			);
		default:
			return (
				<span>
					<strong>{item.actor}</strong> {item.details}
				</span>
			);
	}
};

export default function ActivityComponent() {
	return (
		<>
			{activityData.map((item, index) => (
				<div key={item.id}>
					<div className="flex items-start space-x-4 py-4">
						<Avatar>
							<AvatarImage
								src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.actor}`}
								alt={item.actor}
							/>
							<AvatarFallback>
								{item.actor
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 space-y-1">
							<div className="flex items-center">
								<ActivityIcon type={item.type} />
								<p className="text-sm font-medium text-gray-900 dark:text-gray-100 ml-2">
									<ActivityDescription item={item} />
								</p>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								{new Date(item.timestamp).toLocaleString()}
							</p>
						</div>
					</div>
					{index < activityData.length - 1 && <Separator />}
				</div>
			))}
		</>
	);
}
