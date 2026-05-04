"use client";

import { Edit2, Trash2, Clock, Loader2, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { deleteSlotAction } from "@/actions/avilabilities";
import { cn } from "@/lib/utils";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function SlotTable({
  slots,
  isFetching,
  onEdit,
  onDeleteSuccess,
  tutorProfileId,
}: any) {
  const deleteSlot = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await deleteSlotAction(id, tutorProfileId);
      toast.success("Deleted successfully");
      onDeleteSuccess();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <Card className="shadow-sm border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] rounded-[32px] overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-white/5">
            <TableRow className="hover:bg-transparent dark:border-white/5">
              <TableHead className="w-[120px] pl-8 text-[10px] font-black uppercase tracking-widest">Day</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Subject</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Time Range</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Booked</TableHead>
              <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center">
                  <Loader2 className="animate-spin mx-auto text-emerald-500 w-10 h-10" />
                </TableCell>
              </TableRow>
            ) : slots.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-64 text-center text-slate-400"
                >
                  <div className="flex flex-col items-center gap-4 opacity-40">
                    <AlertCircle className="w-12 h-12" />
                    <p className="font-bold tracking-tight">No teaching slots defined yet.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              slots?.map((slot: any) => (
                <TableRow key={slot.id} className="group dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <TableCell className="pl-8 font-black text-slate-900 dark:text-white tracking-tight">
                    {DAYS[slot.dayOfWeek]}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
                      {slot.category?.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-300 text-xs">
                      <Clock size={14} className="text-emerald-500" />
                      {slot.startTime} - {slot.endTime}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-none",
                        slot.isBooked
                          ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                          : "bg-slate-100 dark:bg-white/10 text-slate-500"
                      )}
                    >
                      {slot.isBooked ? "BOOKED" : "AVAILABLE"}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-8 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-600 transition-all"
                        onClick={() => onEdit(slot)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 transition-all"
                        onClick={() => deleteSlot(slot.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
