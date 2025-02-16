import { Link } from "react-router";

import {
	Bell,
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
	SidebarGroupLabel,
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
			],
		},
	],
};

const data2 = {
	nav: [
		{ name: "Dashboard", url: "/dashboard", icon: Bell },
		{ name: "Ledger", url: "/dashboard/ledger", icon: Menu },
		{ name: "Activities", url: "/dashboard/activities", icon: Home },
		{ name: "Users", url: "/dashboard/users", icon: Home },
		{ name: "Collections", url: "/dashboard/collections", icon: Home },
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
					<SidebarGroup className="-mb-5">
						<SidebarGroupLabel>Admin Tools</SidebarGroupLabel>

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
