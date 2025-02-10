import { Link } from "react-router";

import {
	Bell,
	Bot,
	GalleryVerticalEnd,
	Home,
	Menu,
	SquareTerminal,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
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
	],
};

const data2 = {
	nav: [
		{ name: "Cash in/out", url: "/dashboard/cash-in-or-out", icon: Bell },
		{ name: "Ledger", url: "/dashboard/ledger", icon: Menu },
		{ name: "Activities", url: "/dashboard/activities", icon: Home },
		{ name: "Users", url: "/dashboard/users", icon: Home },
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

					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								{data2.nav.map((item) => (
									<SidebarMenuItem key={item.name}>
										<SidebarMenuButton
											asChild
											isActive={item.name === "Messages & media"}
										>
											<Link to={item.url}>
												<item.icon />
												<span>{item.name}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter>
					<NavUser user={data.user} />
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
		</>
	);
}
