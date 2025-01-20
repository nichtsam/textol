import { FileDigit, PencilRuler } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	useSidebar,
} from "~/components/ui/sidebar";

export function SideBar({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<CloseMobileOnNav />

			<Sidebar collapsible="icon">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<Link to="/" className="text-3xl hover:underline font-bold ">
									<PencilRuler />
									<span>Textol</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton asChild>
										<Link to="/word-counter">
											<FileDigit />
											<span>Word Counter</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarRail />
			</Sidebar>
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}

let firstRender = true;
function CloseMobileOnNav() {
	const location = useLocation();
	const { setOpenMobile } = useSidebar();

	// biome-ignore lint: lint/correctness/useExhaustiveDependencies
	useEffect(() => {
		if (firstRender) {
			return;
		}

		setOpenMobile(false);
	}, [location.key, location.pathname]);

	useEffect(() => {
		firstRender = false;
	}, []);

	return null;
}
