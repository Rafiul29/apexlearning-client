"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // Your session service
import { toast } from "sonner";
import { format, isSameDay, nextDay } from "date-fns";
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
import { UserRole } from "@/types";
import { createBookingAction } from "@/actions/booking";

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
  const router = useRouter();
  const pathname = usePathname();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const validUpcomingDate = useMemo(() => {
    if (!slot || !isOpen) return null;
    const today = new Date();
    return nextDay(today, slot.dayOfWeek);
  }, [slot, isOpen]);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await authClient.getSession();
      setIsLoggedIn(!!data);
    }
    if (isOpen) checkAuth();
  }, [isOpen]);

  useEffect(() => {
    if (validUpcomingDate && isOpen) {
      setSelectedDate(validUpcomingDate);
    }
  }, [validUpcomingDate, isOpen]);

  if (!slot) return null;

  const disabledDays = (date: Date) => {
    if (!validUpcomingDate) return true;
    return !isSameDay(date, validUpcomingDate);
  };

  const handleConfirm = async () => {
    if (!selectedDate) return;
    setLoading(true);

    try {
      // 1. Session & Role Validation
      const { data: session, error: authError } = await authClient.getSession();

      if (authError || !session) {
        toast.error("Please login to book a session");
        const destination = `/tutors/${tutor.id}`;
        router.push(`/login?redirectUrl=${destination}`);
        return;
      }

      const user = session.user as any;

      if (user?.role !== UserRole.STUDENT) {
        toast.error("Access Denied: Only student accounts can book lessons.");
        setLoading(false);
        return;
      }

      // 2. Prepare Payload
      const payload = {
        tutorProfileId: tutor.id,
        availabilityId: slot.id,
        slotDate: selectedDate.toISOString(),
      };

      const booking = await createBookingAction(payload);

      toast.success("Slot booking successfully");

      await new Promise((resolve) => setTimeout(resolve, 1500)); // Mock delay
      setStep(2);
    } catch (err) {
      toast.error("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
              <DialogHeader className="mb-6 text-center">
                <DialogTitle className="text-2xl font-bold font-['Poppins']">
                  Confirm Booking
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    1. Booking Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-semibold py-7 rounded-2xl border-slate-200 bg-slate-50/50 hover:bg-slate-100",
                          !selectedDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-3 h-5 w-5 text-[#FF6B6B]" />
                        {selectedDate ? (
                          format(selectedDate, "eeee, MMM do, yyyy")
                        ) : (
                          <span>Finding date...</span>
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
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-[#FF6B6B] border border-rose-100">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="text-[11px] font-medium leading-tight">
                      Available only on <strong>{DAYS[slot.dayOfWeek]}s</strong>
                      .
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F6F7F9] dark:bg-slate-800/50 border border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
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

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="block font-bold text-slate-900 dark:text-white text-lg">
                      Total Amount
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide tracking-wide">
                      Includes service fee
                    </span>
                  </div>
                  <span className="text-3xl font-black text-[#FF6B6B]">
                    ${tutor.pricePerHour}
                  </span>
                </div>

                <Button
                  onClick={handleConfirm}
                  disabled={loading || !selectedDate}
                  className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] text-white py-7 rounded-2xl text-lg font-bold shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin h-5 w-5" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <>
                      {isLoggedIn && isLoggedIn
                        ? "Confirm & Pay"
                        : "Login to Book"}
                    </>
                  )}
                </Button>

                <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1.5 uppercase font-bold tracking-tighter">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure SSL encrypted
                  payment
                </p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-300">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Booking Confirmed!
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Your lesson with <strong>{tutor.user?.name}</strong> is set
                  for <br />
                  <span className="text-slate-900 dark:text-slate-200 font-semibold">
                    {selectedDate && format(selectedDate, "PPPP")}
                  </span>
                </p>
              </div>
              <Button
                className="w-full py-7 rounded-2xl bg-slate-900 text-white font-bold"
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
