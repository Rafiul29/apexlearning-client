import { MoreHorizontal, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function RecentBookings({ bookings }: { bookings: any[] }) {
    return (
        <Card className="border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b dark:border-white/5 p-8">
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Recent Bookings
                    </CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">
                        A history of your past and pending sessions.
                    </CardDescription>
                </div>
                <Button variant="ghost" asChild className="text-emerald-600 dark:text-emerald-400 font-black hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-full px-6 text-[10px] uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                    <Link href={'/student/bookings'} className="flex items-center">
                        View All <ChevronRight size={14} className="ml-1" />
                    </Link>
                </Button>
            </CardHeader>

            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-white/5">
                            <TableRow className="hover:bg-transparent dark:border-white/5">
                                <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">Tutor</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest">Date</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest">Amount</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <TableRow
                                        key={booking.id}
                                        className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] dark:border-white/5 transition-colors group"
                                    >
                                        <TableCell className="pl-8 font-black text-slate-900 dark:text-white tracking-tight py-4">
                                            {booking.tutorProfile?.user?.name}
                                        </TableCell>
                                        <TableCell className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                            {formatDate(booking.slotDate)}
                                        </TableCell>
                                        <TableCell className="font-black text-slate-900 dark:text-white tracking-tighter text-lg">
                                            {formatCurrency(booking.totalPrice)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={cn(
                                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-none",
                                                    booking.status === "COMPLETED"
                                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                                        : "bg-slate-100 dark:bg-white/10 text-slate-500"
                                                )}
                                            >
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-48 text-center text-slate-400">
                                         <div className="flex flex-col items-center gap-2 opacity-40">
                                            <p className="font-bold tracking-tight">No recent bookings found.</p>
                                         </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}