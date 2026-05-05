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
  Briefcase,
  TrendingUp,
  ChevronRight,
  MoreHorizontal,
  ExternalLink,
  MessageSquare
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

export default async function TeacherDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: teacher, error } = await userService.getTeacherById(id);

  if (error || !teacher) {
    return (
      <div className="p-10 text-center">
        <p className="text-rose-500 font-bold">Error loading teacher details: {error?.message || "Teacher not found"}</p>
        <Link href="/admin/teacher-management">
          <Button variant="outline" className="mt-4 rounded-full">Back to Management</Button>
        </Link>
      </div>
    );
  }

  const stats = [
    { label: "Total Students", value: teacher.tutorProfile?.bookings?.length || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Experience", value: `${teacher.tutorProfile?.experience_years || 0} Yrs`, icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Avg. Rating", value: teacher.tutorProfile?.averageRating.toFixed(1) || "0.0", icon: Star, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Hourly Rate", value: `$${teacher.tutorProfile?.pricePerHour || 0}`, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/admin/teacher-management">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
          <Link href="/admin/teacher-management" className="hover:text-slate-900 dark:hover:text-white transition-colors">Management</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white">Instructor Profile</span>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="bg-white dark:bg-white/[0.02] rounded-[32px] border border-slate-200 dark:border-white/5 p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-shrink-0">
            <div className="relative group">
              <Avatar className="h-40 w-40 border-4 border-white dark:border-slate-800 shadow-xl ring-1 ring-slate-200 dark:ring-white/5">
                <AvatarImage src={teacher.image} alt={teacher.name} />
                <AvatarFallback className="text-4xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black">
                  {teacher.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 rounded-2xl border-4 border-white dark:border-slate-900 shadow-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="flex-grow space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                  {teacher.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Mail className="w-4 h-4 text-emerald-500" />
                    {teacher.email}
                  </div>
                  {teacher.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Phone className="w-4 h-4 text-emerald-500" />
                      {teacher.phone}
                    </div>
                  )}
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold rounded-full px-3">
                    Active Instructor
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" className="rounded-full flex-1 sm:flex-none font-bold border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5">
                  <MessageSquare className="w-4 h-4 mr-2" /> Message
                </Button>
                <Button className="rounded-full flex-1 sm:flex-none font-black bg-slate-900 dark:bg-white dark:text-slate-900 text-white">
                  Edit Profile
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
        {/* Left Column: Details & Bookings */}
        <div className="lg:col-span-8 space-y-8">
          {/* Bio & Education */}
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
            <CardHeader className="p-8 border-b border-slate-100 dark:border-white/5">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                Professional Background
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">About Instructor</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {teacher.tutorProfile?.bio || "No biography provided."}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Education & Credentials</h3>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                    <GraduationCap className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                    {teacher.tutorProfile?.education || "Credentials not specified."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
            <CardHeader className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                Recent Student Sessions
              </CardTitle>
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold rounded-full">
                {teacher.tutorProfile?.bookings?.length || 0} Total
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-white/[0.01]">
                  <TableRow className="border-slate-100 dark:border-white/5">
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-8 py-4">Student</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-8">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacher.tutorProfile?.bookings?.slice(0, 5).map((booking: any) => (
                    <TableRow key={booking.id} className="border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                      <TableCell className="pl-8 py-5">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-slate-200 dark:border-white/5">
                            <AvatarImage src={booking.student?.image} alt={booking.student?.name} />
                            <AvatarFallback className="text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-500">
                              {booking.student?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{booking.student?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{format(new Date(booking.slotDate), "MMM dd, yyyy")}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{booking.startTime} - {booking.endTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] font-bold border-slate-200 dark:border-white/10 text-slate-500">
                          {booking.category?.name}
                        </Badge>
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
                      <TableCell className="text-right pr-8 font-black text-slate-900 dark:text-white">
                        ${booking.totalPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                  {(teacher.tutorProfile?.bookings?.length || 0) === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-20 text-center text-slate-400 italic">
                        No recent bookings found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Expertise & Availability */}
        <div className="lg:col-span-4 space-y-8">
          {/* Expertise */}
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Teaching Expertise
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="flex flex-wrap gap-2">
                {teacher.tutorProfile?.subjects?.map((sub: string) => (
                  <Badge key={sub} className="bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-none font-bold rounded-lg px-3 py-1">
                    {sub}
                  </Badge>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10">
                <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.2em] mb-2">Platform Rank</p>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-lg font-black text-slate-900 dark:text-white">Top Rated Partner</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Summary */}
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-500" />
                Availability Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              {teacher.tutorProfile?.availability?.slice(0, 5).map((slot: any) => (
                <div key={slot.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center text-[10px] font-black text-slate-500 shadow-sm">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][slot.dayOfWeek]}
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{slot.startTime} - {slot.endTime}</span>
                  </div>
                  <Badge variant="outline" className="text-[9px] py-0 border-slate-200 dark:border-white/10 text-slate-400 font-bold uppercase">
                    {slot.category?.name}
                  </Badge>
                </div>
              ))}
              {(teacher.tutorProfile?.availability?.length || 0) > 5 && (
                <Button variant="ghost" className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-500 transition-colors">
                  View Full Schedule <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-500" />
                Student Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              {teacher.tutorProfile?.reviews?.slice(0, 3).map((review: any) => (
                <div key={review.id} className="space-y-2 border-b border-slate-100 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-2.5 h-2.5", i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">{review.student?.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold">{format(new Date(review.createdAt), "MMM d")}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2">
                    "{review.content}"
                  </p>
                </div>
              ))}
              {(teacher.tutorProfile?.reviews?.length || 0) === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-4">No reviews received yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
