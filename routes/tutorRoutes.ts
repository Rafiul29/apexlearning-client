import { Route } from "@/types";
import { LayoutDashboard, Clock, CalendarDays, Tags, UserCircle, User } from "lucide-react";

export const tutorRoutes: Route[] = [
  {
    title: "Teaching",
    items: [
      {
        title: "Dashboard",
        url: "/tutor/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Availability",
        url: "/tutor/availability",
        icon: Clock,
      },
      {
        title: "My Students",
        url: "/tutor/students",
        icon: User,
      },
      {
        title: "Booking Management",
        url: "/tutor/bookings",
        icon: CalendarDays,
      },
      {
        title: "Categories",
        url: "/tutor/categories",
        icon: Tags,
      },
      {
        title: "Profile",
        url: "/tutor/profile",
        icon: UserCircle,
      },
    ],
  },
];
