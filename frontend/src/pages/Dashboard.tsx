import { DollarSign } from "lucide-react";
import StatsCard from "../components/dashboard/stats-card";

const Dashboard = () => {
	return (
		<div>
			<div className="grid grid-cols-2 md:grid-cols-5 gap-6">
				<StatsCard
					title="3000"
					subTitle="Cash in hand"
					icon={<DollarSign size="18" />}
				/>
				<StatsCard
					title="3000"
					subTitle="Cash in hand"
					icon={<DollarSign size="18" />}
				/>
				<StatsCard
					title="3000"
					subTitle="Cash in hand"
					icon={<DollarSign size="18" />}
				/>
				<StatsCard
					title="3000"
					subTitle="Cash in hand"
					icon={<DollarSign size="18" />}
				/>
				<StatsCard
					title="3000"
					subTitle="Cash in hand"
					icon={<DollarSign size="18" />}
				/>
			</div>
		</div>
	);
};
export default Dashboard;
