import { Link, Navigate, Outlet, useLocation } from "react-router";
import { AppSidebar } from "../components/dashboard/app-sidebar";
import { ModeToggle } from "../components/mode-toggler";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Separator } from "../components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "../components/ui/sidebar";
import { ScrollArea } from "../components/ui/scroll-area";
import { useAppSelector } from "../redux/feature/hooks";
import { useCurrentToken } from "../redux/feature/auth/authSlice";

export default function DefaultLayout() {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	const token = useAppSelector(useCurrentToken);

	if (!token) {
		return <Navigate to="/login" replace={true} />;
	}
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center justify-between w-full gap-2 px-4">
						<div className="flex items-center gap-2">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<Breadcrumb>
								<BreadcrumbList>
									{/* Home or Dashboard Link */}
									{/* <BreadcrumbItem className="hidden md:block">
										<BreadcrumbLink asChild>
											<Link to="/">Dashboard</Link>
										</BreadcrumbLink>
									</BreadcrumbItem> */}

									{/* Separator after Home */}
									{/* {pathnames.length > 0 && (
										<BreadcrumbSeparator className="hidden md:block" />
									)} */}

									{/* Dynamic Breadcrumb Items */}
									{pathnames.map((value, index) => {
										const to = `/${pathnames.slice(0, index + 1).join("/")}`;
										const isLast = index === pathnames.length - 1;

										return (
											<BreadcrumbItem key={to}>
												{isLast ? (
													<BreadcrumbPage>
														{value.charAt(0).toUpperCase() + value.slice(1)}
													</BreadcrumbPage>
												) : (
													<>
														<BreadcrumbLink asChild>
															<Link to={to}>
																{value.charAt(0).toUpperCase() + value.slice(1)}
															</Link>
														</BreadcrumbLink>
														<BreadcrumbSeparator />
													</>
												)}
											</BreadcrumbItem>
										);
									})}
								</BreadcrumbList>
							</Breadcrumb>
						</div>
						<ModeToggle />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
						<div className="aspect-video rounded-xl bg-muted/50" />
					</div> */}
					{/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6 items-center justify-center"> */}
					<ScrollArea className="h-[90vh] w-full  overflow-hidden">
						<Outlet />
					</ScrollArea>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
