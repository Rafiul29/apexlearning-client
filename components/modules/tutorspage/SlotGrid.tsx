"use client";

import { useState } from "react";
import { Calendar, Clock, BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BookingModal from "./BookingModal";

export default function SlotGrid({ availableSlots, tutor, DAYS }: any) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-8 rounded-[32px] shadow-sm border border-slate-200/60 dark:border-white/10 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-3 font-sans tracking-tight text-slate-900 dark:text-white">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-emerald-500" />
            </div>
            Available Slots
          </h2>
        </div>
        <Badge variant="outline" className="gap-2 px-4 py-1.5 rounded-full border-slate-200 dark:border-white/10 font-bold text-slate-500 dark:text-slate-400">
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
            className="group relative p-5 rounded-[24px] bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all cursor-pointer hover:shadow-md active:scale-[0.98]"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full">
              {DAYS[slot.dayOfWeek]}
            </span>
            <div className="mt-4 text-lg font-black text-slate-900 dark:text-white tracking-tight">
              {slot.startTime} - {slot.endTime}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-2 font-medium">
              <div className="w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              {slot.category?.name}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                Open Slot
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {availableSlots?.length === 0 && (
        <div className="text-center py-12 bg-slate-50/50 dark:bg-white/[0.02] rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
          <p className="text-slate-400 italic font-medium">No available slots at this time</p>
        </div>
      )}

      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        slot={selectedSlot}
        tutor={tutor}
      />
    </div>
  );
}
