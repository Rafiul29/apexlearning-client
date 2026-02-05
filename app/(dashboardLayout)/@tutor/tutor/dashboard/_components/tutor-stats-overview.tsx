import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CalendarCheck,
  ChevronRight,
  DollarSign,
  GraduationCap,
  Star,
  Users,
} from "lucide-react";

const StatsCards = [
  {
    label: "Total Earnings",
    value: "$4,250",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    label: "Sessions Taught",
    value: "128",
    icon: GraduationCap,
    color: "text-blue-600",
  },
  {
    label: "Active Students",
    value: "12",
    icon: Users,
    color: "text-purple-600",
  },
  { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-amber-500" },
];

export default function TutorStatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {StatsCards.map((stat) => (
        <Card key={stat.label} className="border-none shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <div
              className={cn(
                "p-3 rounded-xl bg-slate-100 dark:bg-slate-900",
                stat.color,
              )}
            >
              <stat.icon size={24} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
