import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns"; // Recommended for date formatting
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  slotDate: Date;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  student: {
    name: string;
    email: string;
    image: string;
  };
}

export const BookingTable = ({ data }: { data: Booking[] }) => {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-slate-50/50 dark:bg-white/5">
          <TableRow className="border-slate-100 dark:border-white/5">
            <TableHead className="w-[250px] text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">Student</TableHead>
            <TableHead className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">Date & Time</TableHead>
            <TableHead className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">Amount</TableHead>
            <TableHead className="text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-widest">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors border-slate-100 dark:border-white/5">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border-slate-200 dark:border-white/10">
                    <AvatarImage src={booking.student.image} alt={booking.student.name} />
                    <AvatarFallback className="bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400">{booking.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-slate-100 leading-none tracking-tight">
                      {booking.student.name}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      {booking.student.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {format(new Date(booking.slotDate), "MMM dd, yyyy")}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-black text-slate-900 dark:text-white">
                  {formatCurrency(booking.totalPrice)}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={booking.status === "COMPLETED" ? "default" : "secondary"}
                  className={cn(
                    "rounded-full px-3 font-bold text-[10px] uppercase tracking-wider",
                    booking.status === "COMPLETED"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-none"
                      : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 border-none"
                  )}
                >
                  {booking.status}
                </Badge>
              </TableCell>

            </TableRow>
          ))}
          {(!data || data.length === 0) && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10 text-slate-500">
                No recent bookings found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};