"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut } from "lucide-react";
import { UserRole } from "@/types";

export function UserNav({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const dashboardPath =
    user?.role === UserRole.ADMIN
      ? "/admin"
      : user?.role === UserRole.TUTOR
        ? "/tutor/dashboard"
        : "/dashboard";

  return (
    <div className="flex items-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full ring-offset-background transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-0"
          >
            <Avatar className="h-8 w-8 border border-slate-200 dark:border-slate-700">
              <AvatarImage
                src={user?.image}
                alt={user?.name || "User profile"}
              />
              <AvatarFallback className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-60 mt-2 p-2 shadow-xl border-slate-100 dark:border-slate-800 bg-white dark:bg-[#1E293B] rounded-xl"
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuLabel className="font-normal p-3">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none text-slate-900 dark:text-slate-100">
                {user?.name}
              </p>
              <p className="text-xs leading-none text-slate-500 dark:text-slate-400 truncate">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

          <DropdownMenuItem
            asChild
            className="cursor-pointer rounded-lg py-2.5 focus:bg-slate-50 dark:focus:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            <Link href={dashboardPath} className="flex items-center w-full">
              <LayoutDashboard className="mr-3 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span className="font-medium">Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-rose-600 dark:text-rose-400 focus:text-rose-600 dark:focus:text-rose-400 focus:bg-rose-50 dark:focus:bg-rose-950/30 cursor-pointer rounded-lg py-2.5 mt-1"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-semibold">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
