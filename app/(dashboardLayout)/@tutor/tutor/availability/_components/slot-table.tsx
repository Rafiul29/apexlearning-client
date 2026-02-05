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
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900">
            <TableRow>
              <TableHead className="w-[120px] pl-6">Day</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Time Range</TableHead>
              <TableHead>Booked</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={4} className="h-40 text-center">
                  <Loader2 className="animate-spin mx-auto text-rose-500" />
                </TableCell>
              </TableRow>
            ) : slots.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-40 text-center text-slate-400"
                >
                  <AlertCircle className="mx-auto mb-2 opacity-20" />
                  <p>No slots found.</p>
                </TableCell>
              </TableRow>
            ) : (
              slots?.map((slot: any) => (
                <TableRow key={slot.id} className="group">
                  <TableCell className="pl-6 font-semibold">
                    {DAYS[slot.dayOfWeek]}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{slot.category?.name}</Badge>
                  </TableCell>
                  <TableCell>
                    <Clock size={14} className="inline mr-2 text-rose-400" />
                    {slot.startTime} - {slot.endTime}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {slot.isBooked ? "YES" : "NO"}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(slot)}
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50"
                      onClick={() => deleteSlot(slot.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
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
