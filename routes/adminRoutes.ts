import { Route } from "@/types";
import { LayoutDashboard, Users, CalendarDays, Tags } from "lucide-react";

export const adminRoutes: Route[] = [
    {
        title: "Management",
        items: [
            {
                title: "Dashboard",
                url: "/admin",
                icon: LayoutDashboard,
            },
            {
                title: "Users",
                url: "/admin/users",
                icon: Users,
            },
            {
                title: "Bookings",
                url: "/admin/bookings",
                icon: CalendarDays,
            },
            {
                title: "Categories",
                url: "/admin/categories",
                icon: Tags,
            },
        ],
    },
];