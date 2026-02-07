import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { DollarSign, GraduationCap, Star, Users } from "lucide-react";

export default function TutorStatsOverview({ stats }: { stats: any }) {

  const StatsCards = [
    {
      label: "Total Earnings",
      value: formatCurrency(stats.totalEarnings),
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      label: "Sessions Taught",
      value: stats.sessionsTaught.toString(),
      icon: GraduationCap,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Active Students",
      value: stats.activeStudents.toString(),
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      label: "Avg. Rating",
      value: stats.avgRating,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {StatsCards.map((stat) => (
        <Card key={stat.label} className="border-none shadow-sm overflow-hidden group hover:ring-1 hover:ring-slate-200 transition-all">
          <CardContent className="p-6 flex items-center justify-between bg-white dark:bg-slate-900">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </h3>
            </div>
            <div
              className={cn(
                "p-3 rounded-xl transition-transform group-hover:scale-110",
                stat.bg,
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