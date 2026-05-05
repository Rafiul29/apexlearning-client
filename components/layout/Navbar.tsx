"use client";

import { Menu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/hooks/use-session";
import { UserNav } from "./nav-user";
import { ModeToggle } from "./MobileToogle";
import SearchModal from "../modules/shared/SearchModal";

const Navbar = () => {
  const { session, user, refetch } = useSession();

  const getMenu = () => {
    const baseMenu = [
      { title: "Find Tutors", url: "/tutors" },
      { title: "About", url: "/about" },
      { title: "Blog", url: "/blog" },
      { title: "Contact", url: "/contact" },
    ];

    if (session) {
      const dashboardUrl = user?.role === 'ADMIN' ? '/admin' : user?.role === 'TUTOR' ? '/tutor/dashboard' : '/dashboard';
      return [
        ...baseMenu,
        { title: "Dashboard", url: dashboardUrl },
      ];
    }

    return baseMenu;
  };

  const menu = getMenu();

  return (
    <section className="fixed top-0 z-50 w-full border-b border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md py-3 font-sans transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] pr-[var(--removed-body-scroll-bar-size,0px)]">
      <div className="wrapper">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Image
                width={100}
                height={80}
                src="/logo.png"
                className="dark:invert object-contain"
                alt="Apex Logo"
              />
            </Link>
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-[#4B5563] dark:text-slate-300 transition-all hover:bg-gray-100 dark:hover:bg-white/10 hover:text-[#111827] dark:hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <SearchModal />

            <ModeToggle />
            {session ? (
              <UserNav user={user || {}} refetch={refetch} />
            ) : (
              <div className="flex items-center gap-3 ml-2">
                <Button asChild variant="outline" size="sm" className="rounded-full border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 font-semibold text-[#111827] dark:text-white h-10 px-6 transition-all shadow-none">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold h-10 px-6 transition-all border border-transparent dark:border-emerald-700/50 group shadow-[0_4px_14px_0_rgb(6,78,59,0.39)]">
                  <Link href="/register" className="flex items-center gap-1.5">
                    Join for Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center justify-between lg:hidden ">
          <Link href="/" className="flex items-center gap-2">
            <Image
              width={32}
              height={32}
              src="/logo.png"
              className="dark:invert"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center gap-2">
            <SearchModal />
            <ModeToggle />
            {session && <UserNav user={user || {}} />}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="size-5" strokeWidth={1.5} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] px-5 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-white/10 font-sans">
                <SheetHeader className="text-left border-b border-gray-100 dark:border-white/10 pb-4">
                  <SheetTitle className="font-extrabold text-[#111827] dark:text-white">Apex Learning</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-lg font-bold text-[#4B5563] dark:text-slate-300 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <hr className="border-gray-100 dark:border-white/10 my-2" />

                  {!session && (
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline" className="rounded-full border border-gray-200 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 font-semibold text-[#111827] dark:text-white h-12 shadow-none">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild className="rounded-full bg-emerald-800 hover:bg-emerald-900 text-white font-semibold h-12 flex items-center justify-center gap-2 group shadow-[0_4px_14px_0_rgb(6,78,59,0.39)] border border-transparent dark:border-emerald-700/50">
                        <Link href="/register">
                          Join for Free
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
