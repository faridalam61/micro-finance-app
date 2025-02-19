import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { DateRange } from "./types";

interface FilterComponentsProps {
	onTypeChange: (type: string | undefined) => void;
	onDateRangeChange: (range: DateRange) => void;
	onReset: () => void;
}

export const FilterComponents: React.FC<FilterComponentsProps> = ({
	onTypeChange,
	onDateRangeChange,
	onReset,
}) => {
	const [, setDate] = React.useState<DateRange>({
		from: undefined,
		to: undefined,
	});

	const handleDateRangeSelect = (
		range: "today" | "week" | "month" | "year"
	) => {
		const today = new Date();
		const from = new Date(today);
		switch (range) {
			case "today":
				break;
			case "week":
				from.setDate(today.getDate() - 7);
				break;
			case "month":
				from.setMonth(today.getMonth() - 1);
				break;
			case "year":
				from.setFullYear(today.getFullYear() - 1);
				break;
		}
		setDate({ from, to: today });
		onDateRangeChange({ from, to: today });
	};

	return (
		<div className="flex space-x-4 mb-4">
			<Select
				onValueChange={(value) =>
					onTypeChange(value === "all" ? undefined : value)
				}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select type" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="expense">Expense</SelectItem>
					<SelectItem value="investment">Investment</SelectItem>
					<SelectItem value="cash out">Cash Out</SelectItem>
					<SelectItem value="cash in">Cash In</SelectItem>
					<SelectItem value="other">Other</SelectItem>
				</SelectContent>
			</Select>

			<Button onClick={onReset}>All</Button>
			<Button onClick={() => handleDateRangeSelect("today")}>Today</Button>
			<Button onClick={() => handleDateRangeSelect("week")}>This Week</Button>
			<Button onClick={() => handleDateRangeSelect("month")}>This Month</Button>
			<Button onClick={() => handleDateRangeSelect("year")}>This Year</Button>
		</div>
	);
};
