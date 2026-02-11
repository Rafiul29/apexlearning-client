import { Route } from "@/types";

export const adminRoutes: Route[] = [
    {
        items: [
            {
                title: "Dashboard",
                url: "/admin",
            },
            {
                title: "Users",
                url: "/admin/users",
            },
            {
                title: "Bookings",
                url: "/admin/bookings",
            },
            {
                title: "Categories",
                url: "/admin/categories",
            },
        ],
    },
];