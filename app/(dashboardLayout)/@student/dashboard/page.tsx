
import React from "react";
import {
  Calendar,
  Clock,
  Video,
  Star,
  BookOpen,
  TrendingUp,
  MoreHorizontal,
  ChevronRight,
  Wallet,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const dynamic = "force-dynamic";

const UPCOMING_LESSON = {
  tutor: "Dr. Aris Thorne",
  subject: "Advanced Calculus",
  date: "Today",
  time: "4:00 PM - 5:00 PM",
  status: "Confirmed",
};

const RECENT_BOOKINGS = [
  {
    id: "BK-102",
    tutor: "Sarah Jenkins",
    subject: "Organic Chemistry",
    date: "Feb 02, 2026",
    amount: "$40",
    status: "Completed",
  },
  {
    id: "BK-105",
    tutor: "Mark Volkov",
    subject: "Python Basics",
    date: "Jan 28, 2026",
    amount: "$35",
    status: "Completed",
  },
  {
    id: "BK-109",
    tutor: "Dr. Aris Thorne",
    subject: "Linear Algebra",
    date: "Jan 25, 2026",
    amount: "$45",
    status: "Completed",
  },
];

export default function StudentDashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8 bg-white min-h-screen">
      {/* 1. Welcome & Next Session Hero */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Badge className="bg-rose-500 hover:bg-rose-600 border-none mb-4">
              Upcoming Lesson
            </Badge>
            <h1 className="text-3xl font-bold mb-2">
              Next session with {UPCOMING_LESSON.tutor}
            </h1>
            <p className="text-slate-400 flex items-center gap-2">
              <Calendar size={16} /> {UPCOMING_LESSON.date} •{" "}
              <Clock size={16} /> {UPCOMING_LESSON.time}
            </p>
          </div>
          <div className="mt-8 flex gap-3 relative z-10">
            <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-6">
              <Video className="mr-2 h-4 w-4" /> Join Classroom
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800"
            >
              Reschedule
            </Button>
          </div>
          {/* Decorative Background Element */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
        </div>

        <Card className="border-slate-200 shadow-sm flex flex-col justify-center p-6 bg-rose-50/30 border-dashed border-2">
          <div className="space-y-4 text-center">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <BookOpen className="text-rose-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">New Subjects?</h3>
              <p className="text-sm text-slate-500">
                Explore over 500+ expert tutors in different fields.
              </p>
            </div>
            <Button className="w-full bg-rose-600 hover:bg-rose-700">
              Find a Tutor
            </Button>
          </div>
        </Card>
      </div>

      {/* 2. Stats Row */}
      <div className="grid gap-4 md:grid-cols-4">
        <QuickStat
          label="Total Lessons"
          value="24"
          icon={BookOpen}
          color="text-blue-600"
        />
        <QuickStat
          label="Hours Learned"
          value="38.5"
          icon={Clock}
          color="text-purple-600"
        />
        <QuickStat
          label="Avg. Rating Given"
          value="4.9"
          icon={Star}
          color="text-amber-500"
        />
        <QuickStat
          label="Wallet Balance"
          value="$120.00"
          icon={Wallet}
          color="text-emerald-600"
        />
      </div>

      {/* 3. Recent Activity Table */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent Bookings</CardTitle>
            <CardDescription>
              A history of your past and pending sessions.
            </CardDescription>
          </div>
          <Button variant="ghost" className="text-rose-600 font-bold">
            View All <ChevronRight size={16} className="ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="pl-6">Tutor</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_BOOKINGS.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-slate-50/50">
                  <TableCell className="pl-6 font-semibold">
                    {booking.tutor}
                  </TableCell>
                  <TableCell>{booking.subject}</TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {booking.date}
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">
                    {booking.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        <DropdownMenuItem>Report Issue</DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600">
                          Rebook Tutor
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
    </div>
  );
}

function QuickStat({ label, value, icon: Icon, color }: any) {
  return (
    <Card className="border-slate-100 shadow-sm">
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`p-2 rounded-lg bg-slate-50 ${color}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-xl font-bold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
