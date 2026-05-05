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

export default async function StudentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: student, error } = await userService.getStudentById(id);

  if (error || !student) {
    return (
      <div className="p-10 text-center">
        <p className="text-rose-500 font-bold">Error loading student details: {error?.message || "Student not found"}</p>
        <Link href="/admin/student-management">
          <Button variant="outline" className="mt-4 rounded-full">Back to Management</Button>
        </Link>
      </div>
    );
  }

  const totalSpent = student.bookings?.reduce((acc: number, b: any) => acc + (b.totalPrice || 0), 0) || 0;

  const stats = [
    { label: "Total Bookings", value: student.bookings?.length || 0, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Reviews Written", value: student.reviews?.length || 0, icon: MessageSquare, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { label: "Total Investment", value: `$${totalSpent}`, icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Account Status", value: student.status, icon: ShieldCheck, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/admin/student-management">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
          <Link href="/admin/student-management" className="hover:text-slate-900 dark:hover:text-white transition-colors">Students</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white">Student Profile</span>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="bg-white dark:bg-white/[0.02] rounded-[32px] border border-slate-200 dark:border-white/5 p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-shrink-0">
            <Avatar className="h-40 w-40 border-4 border-white dark:border-slate-800 shadow-xl ring-1 ring-slate-200 dark:ring-white/5">
              <AvatarImage src={student.image} alt={student.name} />
              <AvatarFallback className="text-4xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black">
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
                    <Mail className="w-4 h-4 text-blue-500" />
                    {student.email}
                  </div>
                  {student.phone && (
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Phone className="w-4 h-4 text-blue-500" />
                      {student.phone}
                    </div>
                  )}
                  <Badge className={cn(
                    "border-none font-bold rounded-full px-3",
                    student.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                  )}>
                    {student.status} Account
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button variant="outline" className="rounded-full flex-1 sm:flex-none font-bold border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5">
                  Send Email
                </Button>
                <Button className="rounded-full flex-1 sm:flex-none font-black bg-slate-900 dark:bg-white dark:text-slate-900 text-white">
                  Manage Account
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
        {/* Left Column: Booking History */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
            <CardHeader className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black flex items-center gap-3">
                <History className="w-5 h-5 text-blue-500" />
                Learning History
              </CardTitle>
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-none font-bold rounded-full">
                {student.bookings?.length || 0} Sessions
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-white/[0.01]">
                  <TableRow className="border-slate-100 dark:border-white/5">
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-8 py-4">Instructor</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Time</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right pr-8">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {student.bookings?.map((booking: any) => (
                    <TableRow key={booking.id} className="border-slate-100 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                      <TableCell className="pl-8 py-5">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-slate-200 dark:border-white/5">
                            <AvatarImage src={booking.tutorProfile?.user?.image} alt={booking.tutorProfile?.user?.name} />
                            <AvatarFallback className="text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-500">
                              {booking.tutorProfile?.user?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{booking.tutorProfile?.user?.name}</span>
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
                  {(student.bookings?.length || 0) === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-20 text-center text-slate-400 italic">
                        This student hasn't booked any sessions yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Activity & Reviews */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Stats Summary */}
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-3">
                <Activity className="w-5 h-5 text-emerald-500" />
                Learning Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Total Hours Learned</span>
                  </div>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {student.bookings?.filter((b: any) => b.status === "COMPLETED").length || 0} Hours
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Completion Rate</span>
                  </div>
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {student.bookings?.length > 0 
                      ? Math.round((student.bookings.filter((b: any) => b.status === "COMPLETED").length / student.bookings.length) * 100) 
                      : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Provided */}
          <Card className="rounded-[32px] border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-black flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                Student Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              {student.reviews?.map((review: any) => (
                <div key={review.id} className="space-y-2 border-b border-slate-100 dark:border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-2.5 h-2.5", i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">For {review.tutorProfile?.user?.name}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold">{format(new Date(review.createdAt), "MMM d")}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2">
                    "{review.content}"
                  </p>
                </div>
              ))}
              {(student.reviews?.length || 0) === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-4">No reviews written yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
