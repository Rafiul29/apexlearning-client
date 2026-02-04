import { Route } from "@/types";

export const studentRoutes: Route[] = [
    {
        // title: "Dashboard",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
            },
            {
                title: "My Bookings",
                url: "/dashboard/bookings",
            },
            {
                title: "Profile",
                url: "/dashboard/profile",
            },
        ],
    },

];