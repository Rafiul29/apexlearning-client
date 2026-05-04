import { DollarSign, GraduationCap, Users, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "./_components/StatCard";
import { ApprovalQueue } from "./_components/ApprovalQueue";
import { PlatformVitals } from "./_components/PlatformVitals";
import { dashboardStatisticsService } from "@/services/dashboard-statistics.service";
import { formatCurrency } from "@/lib/format";
import { BookingTable } from "./_components/bookingTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { data: stats, error } =
    await dashboardStatisticsService.getDashboardStatistics();

  const STATS = [
    {
      label: "Total Revenue",
      value: formatCurrency(stats?.totalRevenue),
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Active Tutors",
      value: stats?.activeTutors?.toString(),
      icon: GraduationCap,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Students",
      value: stats?.totalStudents?.toString(),
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Booked Sessions",
      value: stats?.bookedSessions?.toString(),
      icon: CalendarCheck,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            Admin <span className="text-emerald-600">Control</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage marketplace supply and demand metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5">
            Export CSV
          </Button>
          <Button className="rounded-full px-6 font-black bg-slate-900 dark:bg-white dark:text-slate-900 text-white shadow-lg active:scale-95 transition-all">
            System Settings
          </Button>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* 3. Main Dashboard Body */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white dark:bg-white/[0.02] p-8 rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm">
            <h2 className="text-xl font-black mb-6 tracking-tight text-slate-900 dark:text-white uppercase text-[10px] tracking-widest text-slate-400">Platform Growth</h2>
            <PlatformVitals data={stats?.chartData} />
          </section>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <section className="bg-white dark:bg-white/[0.02] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Recent Bookings</h2>
              <Button variant="ghost" size="sm" className="text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-full">
                View All
              </Button>
            </div>
            <div className="flex-1 overflow-x-auto">
              <BookingTable data={stats?.recentBookings} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
