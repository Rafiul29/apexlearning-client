"use client";
import {
  Users,
  GraduationCap,
  DollarSign,
  CalendarCheck,
  TrendingUp,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  Activity,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- MOCK DATA ---
const STATS = [
  {
    label: "Total Revenue",
    value: "$128,430",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Active Tutors",
    value: "842",
    change: "+4.3%",
    icon: GraduationCap,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Total Students",
    value: "12,104",
    change: "+18.2%",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    label: "Booked Sessions",
    value: "3,240",
    change: "-2.1%",
    icon: CalendarCheck,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const PENDING_TUTORS = [
  {
    id: "1",
    name: "Dr. Sarah Miller",
    subject: "Quantum Physics",
    date: "2 mins ago",
  },
  {
    id: "2",
    name: "Marcus Tsoi",
    subject: "Fullstack Web Dev",
    date: "1 hour ago",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    subject: "Organic Chemistry",
    date: "3 hours ago",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50/50 min-h-screen">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 font-medium">
            Marketplace oversight and tutor management.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="shadow-sm">
            Export CSV
          </Button>
          <Button >
            View Analytics
          </Button>
        </div>
      </div>

      {/* 2. Statistics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                {/* <Badge variant={stat.change.startsWith('+') ? "success" : "destructive"}>
                  {stat.change}
                </Badge> */}
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <h2 className="text-3xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* 3. Tutor Approval Table (Main Content) */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-white/50">
            <div>
              <CardTitle>Approval Queue</CardTitle>
              <CardDescription>
                Review and verify incoming tutor profiles.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-rose-600 font-bold hover:bg-rose-50"
            >
              Refresh List
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="pl-6">Tutor</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead className="text-right pr-6">Management</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {PENDING_TUTORS.map((tutor) => (
                  <TableRow
                    key={tutor.id}
                    className="group hover:bg-slate-50/50"
                  >
                    <TableCell className="pl-6 font-bold text-slate-800">
                      {tutor.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-100"
                      >
                        {tutor.subject}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs flex items-center gap-1 mt-3">
                      <Clock size={12} /> {tutor.date}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-white"
                          >
                            <MoreHorizontal size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 shadow-xl border-slate-200"
                        >
                          <DropdownMenuLabel>
                            Actions Required
                          </DropdownMenuLabel>
                          <DropdownMenuItem className="text-emerald-600 focus:bg-emerald-50 cursor-pointer">
                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                            Applicant
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-rose-600 focus:bg-rose-50 cursor-pointer">
                            <XCircle className="mr-2 h-4 w-4" /> Reject
                            Applicant
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            View CV & Credentials
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 4. Platform Health (Side Content) */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-900 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-rose-400" /> Platform Vitals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <HealthIndicator
                label="Booking Success Rate"
                value={98}
                color="bg-emerald-500"
              />
              <HealthIndicator
                label="API Availability"
                value={99.9}
                color="bg-blue-500"
              />
              <HealthIndicator
                label="Avg. Support Ticket"
                value={82}
                color="bg-amber-500"
              />

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">
                      Current Liquidity
                    </p>
                    <p className="text-xl font-black text-emerald-900">
                      $12,400.00
                    </p>
                  </div>
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <ArrowUpRight className="text-emerald-600" size={24} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function HealthIndicator({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-900">{value}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
