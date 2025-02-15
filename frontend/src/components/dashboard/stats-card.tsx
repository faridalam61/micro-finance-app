type StatsProps = {
	title: string;
	subTitle: string;
	icon?: React.ReactNode;
};
const StatsCard = ({ title, subTitle, icon }: StatsProps) => {
	return (
		<div className="relative border p-5 rounded-md bg-muted">
			<div className="border rounded-full absolute top-1 right-1 p-1">
				{icon}
			</div>
			<h2 className="font-bold text-2xl">$ {title}</h2>
			<p className="text-sm">{subTitle}</p>
		</div>
	);
};
export default StatsCard;
