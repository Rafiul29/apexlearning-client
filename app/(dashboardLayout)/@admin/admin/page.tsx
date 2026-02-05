
import { DollarSign, GraduationCap, Users, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "./_components/StatCard";
import { ApprovalQueue } from "./_components/ApprovalQueue";
import { PlatformVitals } from "./_components/PlatformVitals";

export const dynamic = "force-dynamic";

const STATS = [
  { label: "Total Revenue", value: "$128,430", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Active Tutors", value: "842", icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Total Students", value: "12,104", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Booked Sessions", value: "3,240", icon: CalendarCheck, color: "text-rose-600", bg: "bg-rose-50" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium">Marketplace oversight and tutor management.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="shadow-sm">Export CSV</Button>
          <Button>View Analytics</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        <ApprovalQueue />
        <div className="space-y-6">
          <PlatformVitals />
        </div>
      </div>
    </div>
  );
}