import { SidebarTrigger } from "./ui/sidebar";

export function SiteHeader() {
	return (
		<header className="h-12 flex items-center shadow px-4 justify-end md:justify-start">
			<SidebarTrigger />
		</header>
	);
}
