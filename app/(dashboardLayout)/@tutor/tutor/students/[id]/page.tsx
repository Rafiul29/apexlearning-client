import { userService } from "@/services/user.service";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  BookOpen,
  GraduationCap,
  Users,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  CreditCard,
  LayoutGrid,
  History,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function TutorStudentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: student, error } = await userService.getTutorStudentById(id);

  if (error || !student) {
    return (
      <div className="p-10 text-center">
        <p className="text-rose-500 font-bold">Error loading student details: {error?.message || "Student not found"}</p>
        <Link href="/tutor/students">
          <Button variant="outline" className="mt-4 rounded-full">Back to My Students</Button>
        </Link>
      </div>
    );
  }

  const totalLessons = student.bookings?.length || 0;
  const reviewsReceived = student.reviews?.length || 0;

  const stats = [
    { label: "Lessons with me", value: totalLessons, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Feedback Left", value: reviewsReceived, icon: Star, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Completion Rate", value: "98%", icon: Activity, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Student Tenure", value: "4 Months", icon: History, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/tutor/students">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
          <Link href="/tutor/students" className="hover:text-slate-900 dark:hover:text-white transition-colors">My Students</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white">Learner Profile</span>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="bg-white dark:bg-white/[0.02] rounded-[32px] border border-slate-200 dark:border-white/5 p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-shrink-0">
            <Avatar className="h-40 w-40 border-4 border-white dark:border-slate-800 shadow-xl ring-1 ring-slate-200 dark:ring-white/5">
              <AvatarImage src={student.image} alt={student.name} />
              <AvatarFallback className="text-4xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black">
                {student.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-grow space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                  {student.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Mail className="w-4 h-4 text-emerald-500" />
                    {student.email}
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold rounded-full px-3">
                    Active Learner
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" className="rounded-full flex-1 sm:flex-none font-bold border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5">
                  <MessageSquare className="w-4 h-4 mr-2" /> Message Student
                </Button>
                <Button className="rounded-full flex-1 sm:flex-none font-black bg-slate-900 dark:bg-white dark:text-slate-900 text-white">
                  Schedule Session
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-1">
                    <div className={cn("p-1.5 rounded-lg", stat.bg)}>
                      <stat.icon className={cn("w-4 h-4", stat.color)} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Shared Booking History */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
            <CardHeader className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <History className="w-5 h-5 text-blue-500" />
                Shared Session History
              </CardTitle>
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold rounded-full">
                {totalLessons} Completed
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-white/[0.01]">
                  <TableRow className="border-slate-100 dark:border-white/5">
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-8 py-4">Lesson Topic</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-8">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.bookings?.map((booking: any) => (
                    <TableRow key={booking.id} className="border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                      <TableCell className="pl-8 py-5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {booking.category?.name || "Private Session"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{format(new Date(booking.slotDate), "MMM dd, yyyy")}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{booking.startTime} - {booking.endTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "rounded-full px-2 text-[9px] font-black uppercase tracking-tighter border-none",
                            booking.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600" : "bg-blue-500/10 text-blue-600"
                          )}
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <Button variant="ghost" size="sm" className="rounded-full h-8 text-[10px] font-bold">
                          Add Session Notes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {totalLessons === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="py-20 text-center text-slate-400 italic">
                        No previous sessions recorded.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Feedback Provided by Student */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-500" />
                Feedback Received
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              {student.reviews?.map((review: any) => (
                <div key={review.id} className="space-y-2 border-b border-slate-100 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-2.5 h-2.5", i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                      ))}
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold">{format(new Date(review.createdAt), "MMM d")}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-3">
                    "{review.content}"
                  </p>
                </div>
              ))}
              {reviewsReceived === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-4">No feedback provided yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
