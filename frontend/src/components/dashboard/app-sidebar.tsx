import {
	Bot,
	GalleryVerticalEnd,
	Settings2,
	SquareTerminal,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "../../components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
	user: {
		name: "Farid Alam",
		email: "faridalam62@gmail.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Micro Finance",
			logo: GalleryVerticalEnd,
			plan: "Management system",
		},
		
	],
	navMain: [
		{
			title: "Loan",
			url: "#",
			icon: SquareTerminal,
			// isActive: true,
			items: [
				{
					title: "All Loans",
					url: "/dashboard/loans",
				},
				{
					title: "Application",
					url: "/dashboard/application",
				},
				{
					title: "Disburse",
					url: "/dashboard/disburse",
				},
			],
		},
		{
			title: "Collection",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Collections",
					url: "/dashboard/collections",
				},
				{
					title: "Collect Installment",
					url: "/dashboard/collect-loan",
				},
				
			
			],
		},
		
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			
		},
	],
	
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<>
		
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
		
		</>
	);
}
