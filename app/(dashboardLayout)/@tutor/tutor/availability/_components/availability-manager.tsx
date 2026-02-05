"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { CalendarClock } from "lucide-react";
import SlotForm from "./slot-form";
import SlotTable from "./slot-table";
import { findTutorSlotsAction } from "@/actions/avilabilities";

export default function AvailabilityManager({
  tutorProfileId,
  categories = [],
}: any) {
  const [slots, setSlots] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [editingSlot, setEditingSlot] = useState<any | null>(null);

  const fetchSlots = async () => {
    setIsFetching(true);
    try {
      const { data, error } = await findTutorSlotsAction(tutorProfileId);

      if (error) {
        // toast.error(error);
      } else {
        setSlots(data || []);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [tutorProfileId]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CalendarClock className="text-rose-600" /> Availability Settings
        </h1>
        <p className="text-slate-500 mt-1">
          Define your weekly teaching hours for students to book.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SlotForm
            tutorProfileId={tutorProfileId}
            categories={categories}
            editingSlot={editingSlot}
            onSuccess={() => {
              setEditingSlot(null);
              fetchSlots();
            }}
            onCancel={() => setEditingSlot(null)}
          />
        </div>

        <div className="lg:col-span-8">
          <SlotTable
            slots={slots}
            tutorProfileId={tutorProfileId}
            isFetching={isFetching}
            onEdit={setEditingSlot}
            onDeleteSuccess={fetchSlots}
          />
        </div>
      </div>
    </div>
  );
}
