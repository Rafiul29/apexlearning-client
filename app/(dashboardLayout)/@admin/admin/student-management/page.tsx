import { userService } from "@/services/user.service";
import {
  Users,
  Search,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  Calendar,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Clock,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function StudentManagementPage() {
  const { data: students, error } = await userService.getAllStudents();

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="text-rose-500 font-bold">Error loading students: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            Student <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Manage student accounts, monitor learning progress, and review session history.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5">
            Export Data
          </Button>
          <Button className="rounded-full px-6 font-black bg-slate-900 dark:bg-white dark:text-slate-900 text-white shadow-lg active:scale-95 transition-all">
            Add New Student
          </Button>
        </div>
      </div>

      {/* 2. Quick Metrics */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <div className="bg-white dark:bg-white/[0.02] p-6 rounded-[32px] border border-slate-200 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Students</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{students?.length || 0}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-white/[0.02] p-6 rounded-[32px] border border-slate-200 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl">
            <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Bookings</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {students?.reduce((acc: number, s: any) => acc + (s._count?.bookings || 0), 0) || 0}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-white/[0.02] p-6 rounded-[32px] border border-slate-200 dark:border-white/5 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Learners</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {students?.filter((s: any) => s.status === "ACTIVE").length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Student Table */}
      <section className="bg-white dark:bg-white/[0.02] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-white/[0.01]">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Student Directory</h2>
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold rounded-full px-3">
              {students?.length || 0} Enrolled
            </Badge>
          </div>
          {/* <div className="relative group w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search students..."
              className="pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full sm:w-72 transition-all shadow-inner"
            />
          </div> */}
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 dark:bg-white/[0.01]">
              <TableRow className="border-slate-100 dark:border-white/5">
                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] py-5 pl-8">Student</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">Recent Activity</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">Enrollment</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">Status</TableHead>
                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] text-right pr-8">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.map((student: any) => (
                <TableRow key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors border-slate-100 dark:border-white/5 group">
                  <TableCell className="pl-8 py-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-md ring-1 ring-slate-200 dark:ring-white/5">
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 leading-tight">
                          {student.name}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                          {student.email}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[9px] py-0 px-2 rounded-md border-slate-200 dark:border-white/10 text-slate-500 uppercase font-bold tracking-tighter">
                            ID: {student.id.slice(-6)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[250px] space-y-1.5">
                      {student.bookings?.[0] ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                              Last session: {format(new Date(student.bookings[0].slotDate), "MMM dd")}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium line-clamp-1 italic">
                            with {student.bookings[0].tutorProfile?.user?.name} ({student.bookings[0].category?.name})
                          </p>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No recent activity</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <LayoutGrid className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {student._count?.bookings || 0} Bookings
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                          {student._count?.reviews || 0} Reviews Written
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-full px-3 font-bold text-[10px] uppercase tracking-wider border-none",
                        student.status === "ACTIVE"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      )}
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-9 w-9 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4 text-slate-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 rounded-[20px] p-2 bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
                        <DropdownMenuLabel className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 py-2">Student Actions</DropdownMenuLabel>
                        <Link href={`/admin/student-management/${student.id}`}>
                          <DropdownMenuItem className="rounded-xl focus:bg-slate-50 dark:focus:bg-white/10 cursor-pointer py-3 px-3">
                            <ExternalLink className="mr-3 h-4 w-4 text-blue-500" />
                            <span className="font-bold text-sm">View Details</span>
                          </DropdownMenuItem>
                        </Link>
                        {/* <DropdownMenuItem className="rounded-xl focus:bg-slate-50 dark:focus:bg-white/10 cursor-pointer py-3 px-3">
                          <Calendar className="mr-3 h-4 w-4 text-emerald-500" />
                          <span className="font-bold text-sm">Booking History</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/10 mx-1 my-1" />
                        <DropdownMenuItem className="rounded-xl focus:bg-rose-50 dark:focus:bg-rose-500/10 cursor-pointer py-3 px-3 group">
                          <ShieldCheck className="mr-3 h-4 w-4 text-rose-500 group-hover:text-rose-600" />
                          <span className="font-bold text-sm text-rose-500 group-hover:text-rose-600">Restrict Account</span>
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {(!students || students.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[24px]">
                        <Users className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-900 dark:text-white font-black tracking-tight">No Students Found</p>
                        <p className="text-slate-400 dark:text-slate-500 text-sm">Start by inviting or creating a new student account.</p>
                      </div>
                      {/* <Button className="mt-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6">
                        Add Student
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
