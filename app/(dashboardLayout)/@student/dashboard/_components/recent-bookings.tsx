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
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Recent Bookings
                    </CardTitle>
                    <CardDescription className="dark:text-slate-400">
                        A history of your past and pending sessions.
                    </CardDescription>
                </div>
                <Button variant="link">
                    <Link href={'/dashboard/bookings'} className="flex">   <span> View All</span> <ChevronRight size={16} className="ml-1" /></Link>
                </Button>
            </CardHeader>

            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                            <TableRow className="border-slate-200 dark:border-slate-800">
                                <TableHead className="pl-6 text-slate-700 dark:text-slate-300">Tutor</TableHead>
                                <TableHead className="text-slate-700 dark:text-slate-300">Date</TableHead>
                                <TableHead className="text-slate-700 dark:text-slate-300">Amount</TableHead>
                                <TableHead className="text-slate-700 dark:text-slate-300">Status</TableHead>
                                <TableHead className="text-right pr-6" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <TableRow
                                        key={booking.id}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 border-slate-200 dark:border-slate-800 transition-colors"
                                    >
                                        <TableCell className="pl-6 font-semibold text-slate-900 dark:text-slate-200">
                                            {booking.tutorProfile?.user?.name}
                                        </TableCell>
                                        <TableCell className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                            {formatDate(booking.slotDate)}
                                        </TableCell>
                                        <TableCell className="font-bold text-slate-900 dark:text-slate-100">
                                            {formatCurrency(booking.totalPrice)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "font-bold px-2.5 py-0.5 rounded-full border-none",
                                                    booking.status === "COMPLETED"
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                        : "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                                                )}
                                            >
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        {/* <TableCell className="text-right pr-6">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 dark:text-slate-400">
                                                        <MoreHorizontal size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="dark:bg-slate-900 dark:border-slate-800">
                                                    <DropdownMenuItem className="dark:focus:bg-slate-800">Receipt</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-rose-600 dark:text-rose-400 dark:focus:bg-rose-950/20">Rebook</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell> */}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-slate-400">
                                        No recent bookings found.
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