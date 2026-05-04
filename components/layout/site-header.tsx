
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

    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-slate-500 hover:text-emerald-500 transition-colors" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 bg-slate-200 dark:bg-white/10"
        />
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/20 rounded-full transition-all active:scale-95 group"
        >
          Visit Site
          <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <ModeToggle />
          {data && <UserNav user={data?.user || {}} />}
        </div>
      </div>
    </header>
  );
}
