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
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="w-[250px]">Student</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-slate-50/50 transition-colors">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9 border">
                    <AvatarImage src={booking.student.image} alt={booking.student.name} />
                    <AvatarFallback>{booking.student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 leading-none">
                      {booking.student.name}
                    </span>
                    <span className="text-xs text-slate-500 mt-1">
                      {booking.student.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-700">
                    {format(new Date(booking.slotDate), "MMM dd, yyyy")}
                  </span>
                  <span className="text-xs text-slate-500">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(booking.totalPrice)}
                </span>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={booking.status === "COMPLETED" ? "default" : "secondary"}
                  className={booking.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none" : ""}
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