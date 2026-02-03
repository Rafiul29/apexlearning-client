"use client";

import { useState, useMemo, useEffect } from "react";
import {
  format,
  isSameDay,
  nextDay,
  startOfToday,
  addHours,
  isAfter,
  parse,
} from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
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

export default function BookingModal({ isOpen, onClose, slot, tutor }: any) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // 1. Logic to find the ONLY valid next date
  const validUpcomingDate = useMemo(() => {
    if (!slot || !isOpen) return null;

    const today = new Date();
    // nextDay finds the next occurrence of the dayOfWeek (0-6)
    // If today is Monday and slot is Monday, it will find NEXT Monday.
    let targetDate = nextDay(today, slot.dayOfWeek);

    return targetDate;
  }, [slot, isOpen]);

  // 2. Auto-select the date for the user when modal opens
  useEffect(() => {
    if (validUpcomingDate && isOpen) {
      setSelectedDate(validUpcomingDate);
    }
  }, [validUpcomingDate, isOpen]);

  if (!slot) return null;

  // 3. Strict Disable Logic: Disable everything except that one specific day
  const disabledDays = (date: Date) => {
    if (!validUpcomingDate) return true;
    return !isSameDay(date, validUpcomingDate);
  };

  const handleConfirm = async () => {
    if (!selectedDate) return;
    setLoading(true);

    const payload = {
      tutorProfileId: tutor.id,
      availabilityId: slot.id,
      slotDate: selectedDate.toISOString(),
      amount: tutor.pricePerHour + 2,
    };

    console.log("Submitting Booking:", payload);

    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedDate(undefined);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden border-none rounded-[32px] shadow-2xl">
        <div className="bg-white dark:bg-slate-900">
          {step === 1 ? (
            <div className="p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold text-center font-['Poppins']">
                  Confirm Booking
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Date Selection Section */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    1. Booking Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-semibold py-7 rounded-2xl border-slate-200 bg-slate-50/50 hover:bg-slate-100 transition-colors",
                          !selectedDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-3 h-5 w-5 text-[#FF6B6B]" />
                        {selectedDate ? (
                          format(selectedDate, "eeee, MMM do, yyyy")
                        ) : (
                          <span>Finding available date...</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 rounded-2xl border-none shadow-xl"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={disabledDays}
                        defaultMonth={validUpcomingDate || new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-[#FF6B6B] border border-rose-100 dark:border-rose-900/30">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="text-[11px] leading-tight font-medium">
                      This slot is only available on{" "}
                      <strong>{DAYS[slot.dayOfWeek]}s</strong>. You are booking
                      the next available session.
                    </p>
                  </div>
                </div>

                {/* Slot Info Section */}
                <div className="p-5 rounded-2xl bg-[#F6F7F9] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                    <Clock className="w-5 h-5 text-[#FF6B6B]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Selected Time
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white text-lg">
                      Total Amount
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                      Includes service fee
                    </span>
                  </div>
                  <span className="text-3xl font-black text-[#FF6B6B]">
                    ${tutor.pricePerHour + 2}
                  </span>
                </div>

                <Button
                  onClick={handleConfirm}
                  disabled={loading || !selectedDate}
                  className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white py-7 rounded-2xl text-lg font-bold shadow-lg shadow-rose-200 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Confirm & Pay"
                  )}
                </Button>

                <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure 256-bit SSL
                  encrypted payment
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Booking Confirmed!
                </h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                  Your lesson with <strong>{tutor.user?.name}</strong> is set
                  for <br />
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">
                    {selectedDate && format(selectedDate, "PPPP")}
                  </span>
                </p>
              </div>
              <Button
                className="w-full py-7 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 font-bold hover:opacity-90"
                onClick={resetAndClose}
              >
                Return to Profile
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
