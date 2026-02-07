
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "./nav-user";
import { userService } from "@/services/user.service";
import { ModeToggle } from "./MobileToogle";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export async function SiteHeader() {
  const { data } = await userService.getSession();

  return (

    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-all active:scale-95 group"
        >
          Visit Website
          <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          {data && <UserNav user={data?.user || {}} />}
        </div>
      </div>
    </header>
  );
}
