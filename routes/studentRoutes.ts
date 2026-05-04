import { Route } from "@/types";
import { LayoutDashboard, CalendarCheck, UserCircle } from "lucide-react";

export const studentRoutes: Route[] = [
    {
        title: "Learning",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                title: "My Bookings",
                url: "/dashboard/bookings",
                icon: CalendarCheck,
            },
            {
                title: "Profile",
                url: "/dashboard/profile",
                icon: UserCircle,
            },
        ],
    },
];