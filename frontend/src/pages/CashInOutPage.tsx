import CashInOutForm from "../components/cash-in-out-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card";

const CashInOutPage = () => {
	return (
		// <div>
		// 	<CashInOutForm />
		// </div>
		<Card>
			<CardHeader>
				<CardTitle>Cash In/Out</CardTitle>
				<CardDescription>Make a transection select right type</CardDescription>
			</CardHeader>
			<CardContent>
				<CashInOutForm />
			</CardContent>
		</Card>
	);
};

export default CashInOutPage;
