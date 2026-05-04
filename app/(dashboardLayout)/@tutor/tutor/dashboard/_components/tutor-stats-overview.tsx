import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { DollarSign, GraduationCap, Star, Users } from "lucide-react";


export default function TutorStatsOverview({ stats }: { stats: any }) {

  const StatsCards = [
    {
      label: "Total Earnings",
      value: formatCurrency(stats?.totalEarnings),
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      label: "Sessions Taught",
      value: stats?.sessionsTaught.toString(),
      icon: GraduationCap,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      label: "Active Students",
      value: stats?.activeStudents.toString(),
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      label: "Avg. Rating",
      value: stats?.avgRating,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {StatsCards.map((stat) => (
        <Card key={stat.label} className="border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] rounded-[24px] shadow-sm transition-all hover:shadow-md group">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                {stat.value}
              </h3>
            </div>
            <div
              className={cn(
                "p-4 rounded-2xl transition-all group-hover:rotate-12 group-hover:scale-110",
                stat.bg,
                stat.color,
              )}
            >
              <stat.icon size={24} strokeWidth={2.5} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
