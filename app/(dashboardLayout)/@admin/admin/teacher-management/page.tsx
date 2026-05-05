import { userService } from "@/services/user.service";
import {
    Users,
    GraduationCap,
    Calendar,
    BookOpen,
    Search,
    MoreVertical,
    ExternalLink,
    ShieldCheck,
    Star,
    Clock
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

export const dynamic = "force-dynamic";

export default async function TeacherManagementPage() {
    const { data: teachers, error } = await userService.getAllTeachers();
    console.log("teachers", error);

    if (error) {
        return (
            <div className="p-10 text-center">
                <p className="text-rose-500 font-bold">Error loading teachers: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                        Teacher <span className="text-emerald-600">Management</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Oversee instructor profiles, availability, and student assignments.
                    </p>
                </div>

            </div>

            {/* 2. Stats Quick View */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                <div className="bg-white dark:bg-white/[0.02] p-6 rounded-[32px] border border-slate-200 dark:border-white/5 flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl">
                        <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Instructors</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">{teachers?.length || 0}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-white/[0.02] p-6 rounded-[32px] border border-slate-200 dark:border-white/5 flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl">
                        <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Slots</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">
                            {teachers?.reduce((acc: number, t: any) => acc + (t.tutorProfile?.availability?.length || 0), 0) || 0}
                        </p>
                    </div>
                </div>
                <div className="bg-white dark:bg-white/[0.02] p-6 rounded-[32px] border border-slate-200 dark:border-white/5 flex items-center gap-4 shadow-sm">
                    <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl">
                        <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Students</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">
                            {teachers?.reduce((acc: number, t: any) => acc + (t.tutorProfile?.bookings?.length || 0), 0) || 0}
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Teacher Table */}
            <section className="bg-white dark:bg-white/[0.02] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-white/[0.01]">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">Instructor Directory</h2>
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold rounded-full px-3">
                            {teachers?.length || 0} Profiles
                        </Badge>
                    </div>
                    {/* <div className="relative group w-full sm:w-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search instructors..."
                            className="pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-full sm:w-72 transition-all shadow-inner"
                        />
                    </div> */}
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/50 dark:bg-white/[0.01]">
                            <TableRow className="border-slate-100 dark:border-white/5">
                                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] py-5 pl-8">Instructor</TableHead>
                                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">Expertise & Details</TableHead>
                                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">Performance</TableHead>
                                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">Active Students</TableHead>
                                <TableHead className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] text-right pr-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teachers?.map((teacher: any) => (
                                <TableRow key={teacher.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors border-slate-100 dark:border-white/5 group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-md ring-1 ring-slate-200 dark:ring-white/5">
                                                <AvatarImage src={teacher.image} alt={teacher.name} />
                                                <AvatarFallback className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                                                    {teacher.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 leading-tight">
                                                    {teacher.name}
                                                    {teacher.tutorProfile?.averageRating > 4.5 && (
                                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                                    )}
                                                </span>
                                                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                                                    {teacher.email}
                                                </span>
                                                <Badge variant="outline" className="mt-1 w-fit text-[9px] py-0 px-2 rounded-md border-slate-200 dark:border-white/10 text-slate-500 uppercase font-bold tracking-tighter">
                                                    ID: {teacher.id.slice(-6)}
                                                </Badge>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-[300px] space-y-2">
                                            <div className="flex flex-wrap gap-1.5">
                                                {teacher.tutorProfile?.subjects?.slice(0, 3).map((sub: string) => (
                                                    <Badge key={sub} variant="secondary" className="bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-lg border-none px-2 py-0.5">
                                                        {sub}
                                                    </Badge>
                                                ))}
                                                {(teacher.tutorProfile?.subjects?.length || 0) > 3 && (
                                                    <Badge variant="secondary" className="bg-slate-100 dark:bg-white/5 text-slate-400 text-[10px] font-bold rounded-lg border-none px-2 py-0.5">
                                                        +{(teacher.tutorProfile?.subjects?.length || 0) - 3}
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                                {teacher.tutorProfile?.bio || "No professional summary provided."}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={cn(
                                                                "w-3 h-3",
                                                                i < Math.floor(teacher.tutorProfile?.averageRating || 0)
                                                                    ? "text-amber-400 fill-amber-400"
                                                                    : "text-slate-200 dark:text-slate-800"
                                                            )}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs font-black text-slate-900 dark:text-white">
                                                    {teacher.tutorProfile?.averageRating.toFixed(1)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                                    <span className="text-emerald-600 dark:text-emerald-400">${teacher.tutorProfile?.pricePerHour}</span> / HOUR
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex -space-x-2.5 overflow-hidden">
                                                {teacher.tutorProfile?.bookings?.slice(0, 5).map((booking: any) => (
                                                    <Avatar key={booking.id} className="inline-block h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 shadow-sm ring-1 ring-slate-100 dark:ring-white/5">
                                                        <AvatarImage src={booking.student?.image} alt={booking.student?.name} />
                                                        <AvatarFallback className="text-[8px] bg-slate-100 dark:bg-white/10 text-slate-500">
                                                            {booking.student?.name?.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                ))}
                                                {(teacher.tutorProfile?.bookings?.length || 0) > 5 && (
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 border-2 border-white dark:border-slate-900 text-[9px] font-black text-slate-500 shadow-sm ring-1 ring-slate-100 dark:ring-white/5">
                                                        +{(teacher.tutorProfile?.bookings?.length || 0) - 5}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">
                                                {teacher.tutorProfile?.bookings?.length || 0} Total Bookings
                                            </span>
                                        </div>
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
                                                <DropdownMenuLabel className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 py-2">Account Actions</DropdownMenuLabel>
                                                <Link href={`/admin/teacher-management/${teacher.id}`}>
                                                    <DropdownMenuItem className="rounded-xl focus:bg-slate-50 dark:focus:bg-white/10 cursor-pointer py-3 px-3">
                                                        <ExternalLink className="mr-3 h-4 w-4 text-emerald-500" />
                                                        <span className="font-bold text-sm">Review Profile</span>
                                                    </DropdownMenuItem>
                                                </Link>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(!teachers || teachers.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-32 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[24px]">
                                                <Users className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-slate-900 dark:text-white font-black tracking-tight">No Instructors Found</p>
                                                <p className="text-slate-400 dark:text-slate-500 text-sm">Start by inviting or creating a new teacher profile.</p>
                                            </div>
                                            <Button className="mt-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6">
                                                Invite Instructor
                                            </Button>
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