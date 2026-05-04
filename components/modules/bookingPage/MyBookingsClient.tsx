"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingCard } from "./BookingCard";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface Props {
  initialBookings: any[];
  userRole: string;
  title?: string;
}

export default function MyBookingsClient({
  initialBookings,
  userRole,
  title,
}: Props) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const filteredBookings = initialBookings.filter((booking) => {
    const now = new Date();

    const [time, modifier] = booking.endTime.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const lessonEnd = new Date(booking.slotDate);
    lessonEnd.setHours(hours, minutes, 0, 0);

    const isPast =
      booking.status === "COMPLETED" ||
      booking.status === "CANCELLED" ||
      lessonEnd < now;

    return tab === "upcoming" ? !isPast : isPast;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = new Date(a.slotDate).getTime();
    const dateB = new Date(b.slotDate).getTime();

    if (tab === "past") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  console.log(sortedBookings);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            {title ? title : "My Bookings"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage your sessions and learning history.
          </p>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl border dark:border-white/5">
          <Button
            variant={tab === "upcoming" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("upcoming")}
            className={cn(
              "rounded-xl px-6 font-bold transition-all text-xs uppercase tracking-widest",
              tab === "upcoming"
                ? "bg-white dark:bg-emerald-500 shadow-sm hover:bg-white dark:text-white text-black"
                : "text-slate-500 hover:bg-slate-200 dark:hover:bg-white/5"
            )}
          >
            Upcoming
          </Button>
          <Button
            variant={tab === "past" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("past")}
            className={cn(
              "rounded-xl px-6 font-bold transition-all text-xs uppercase tracking-widest",
              tab === "past"
                ? "bg-white dark:bg-emerald-500 shadow-sm hover:bg-white dark:text-white text-black"
                : "text-slate-500 hover:bg-slate-200 dark:hover:bg-white/5"
            )}
          >
            Past
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {sortedBookings.length > 0 ? (
          sortedBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              userRole={userRole}
            />
          ))
        ) : (
          <div className="py-24 text-center border-2 border-dashed rounded-[32px] border-slate-200 dark:border-white/10 text-slate-400 bg-white dark:bg-white/[0.01]">
            <div className="flex flex-col items-center gap-4">
               <Calendar className="w-12 h-12 text-slate-200 dark:text-slate-800" />
               <p className="font-bold tracking-tight">No {tab} bookings found.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
