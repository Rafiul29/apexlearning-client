import { Route } from "@/types";
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  Tags, 
  GraduationCap, 
  UserCog 
} from "lucide-react";

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
                title: "Teacher Management",
                url: "/admin/teacher-management",
                icon: GraduationCap,
            },
            {
                title: "Student Management",
                url: "/admin/student-management",
                icon: Users,
            },
            {
                title: "Booking Management",
                url: "/admin/bookings",
                icon: CalendarDays,
            },
            {
                title: "Category Management",
                url: "/admin/categories",
                icon: Tags,
            },
            {
                title: "User Management",
                url: "/admin/users",
                icon: UserCog,
            },
        ],
    },
];