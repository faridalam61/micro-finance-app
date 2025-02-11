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
		<div className="w-full md:max-w-md mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>Cash In/Out</CardTitle>
					<CardDescription>
						Make a transection select right type
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CashInOutForm />
				</CardContent>
			</Card>
		</div>
	);
};

export default CashInOutPage;
