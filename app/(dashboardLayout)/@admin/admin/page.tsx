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
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50/50 min-h-screen">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Admin Control
          </h1>
          <p className="text-slate-500 font-medium">
            Manage marketplace supply and demand.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Export CSV</Button>
          <Button>System Settings</Button>
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
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Platform Growth</h2>
            <PlatformVitals data={stats?.chartData} />
          </section>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-semibold">Recent Bookings</h2>
            </div>
            <BookingTable data={stats?.recentBookings} />
          </section>
        </div>
      </div>
    </div>
  );
}
