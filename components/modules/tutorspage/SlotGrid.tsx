"use client";

import { useState } from "react";
import { Calendar, Clock, BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BookingModal from "./BookingModal";

export default function SlotGrid({ availableSlots, tutor, DAYS }: any) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 font-['Poppins']">
            <Calendar className="w-6 h-6 text-[#FF6B6B]" /> Available Slots
          </h2>
        </div>
        <Badge variant="outline" className="gap-2">
          <Clock className="w-3.5 h-3.5" /> GMT+6 Timezone
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {availableSlots.map((slot: any) => (
          <div
            key={slot.id}
            onClick={() => {
              setSelectedSlot(slot);
              setIsOpen(true);
            }}
            className="group relative p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-[#FF6B6B] transition-all cursor-pointer"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B6B] bg-rose-50 px-2 py-0.5 rounded">
              {DAYS[slot.dayOfWeek]}
            </span>
            <div className="mt-3 text-base font-bold text-slate-900 dark:text-white">
              {slot.startTime} - {slot.endTime}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <BookOpen className="w-3 h-3" /> {slot.category?.name}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                Open Slot
              </span>
              <ChevronRight className="w-4 h-4 text-[#FF6B6B] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        slot={selectedSlot}
        tutor={tutor}
      />
    </div>
  );
}
