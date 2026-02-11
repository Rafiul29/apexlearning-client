"use client";

import { Menu } from "lucide-react";
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

  const menu = [
    { title: "Home", url: "/" },
    { title: "Find Tutors", url: "/tutors" },
    // { title: "Become a Tutor", url: "/become-tutor" },
  ];

  return (
    <section className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3">
      <div className="wrapper">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Image
                width={80}
                height={80}
                src="/logo.png"
                className="dark:invert"
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
                        className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
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
            <SearchModal/>
            <ModeToggle />
            {session ? (
              <UserNav user={user || {}} refetch={refetch} />
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm" className="rounded-full px-5">
                  <Link href="/register">Join for Free</Link>
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
             <SearchModal/>
            <ModeToggle />
            {session && <UserNav user={user || {}} />}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] px-5">
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle>Apex Learning</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-lg font-semibold hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <hr />

                  {!session && (
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Register</Link>
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
