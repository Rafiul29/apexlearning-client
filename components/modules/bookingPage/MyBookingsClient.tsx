"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingCard } from "./BookingCard";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  CheckCircle2,
  TrendingUp,
  History,
  LayoutGrid,
  Filter,
  CreditCard,
  DollarSign,
  X
} from "lucide-react";
import { formatCurrency } from "@/lib/format";

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

  const isTutor = userRole === "TUTOR";
  const isStudent = userRole === "STUDENT";

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

  // Calculate Stats
  const totalBookings = initialBookings.length;
  const completedBookings = initialBookings.filter(b => b.status === "COMPLETED").length;
  const upcomingBookings = initialBookings.filter(b => b.status === "CONFIRMED" && new Date(b.slotDate) >= new Date()).length;
  const cancelBookings = initialBookings.filter(b => b.status === "CANCELLED").length;
  const totalAmount = initialBookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);

  const stats = [
    { label: "Total Sessions", value: totalBookings, icon: History, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Completed", value: completedBookings, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { label: "Upcoming", value: upcomingBookings, icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { label: "Cancel", value: cancelBookings, icon: X, color: "text-red-600", bg: "bg-red-50 dark:bg-red-500/10" },
    {
      label: isTutor ? "Total Revenue" : "Total Investment",
      value: formatCurrency(totalAmount),
      icon: isTutor ? TrendingUp : CreditCard,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-500/10"
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            {title ? title : "My Bookings"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
            Track your learning progress and manage your scheduled sessions.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200/50 dark:border-white/5 shadow-inner">
          <button
            onClick={() => setTab("upcoming")}
            className={cn(
              "px-6 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-300",
              tab === "upcoming"
                ? "bg-white dark:bg-emerald-500 text-slate-900 dark:text-white shadow-xl scale-[1.02]"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            Upcoming
          </button>
          <button
            onClick={() => setTab("past")}
            className={cn(
              "px-6 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-300",
              tab === "past"
                ? "bg-white dark:bg-emerald-500 text-slate-900 dark:text-white shadow-xl scale-[1.02]"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            Past History
          </button>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-white/[0.02] p-5 rounded-[28px] border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className={cn("absolute -right-4 -bottom-4 w-20 h-20 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity", stat.color)}>
              <stat.icon className="w-full h-full transform -rotate-12" />
            </div>
            <div className="flex flex-col gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-sm", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Bookings List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
              {tab === "upcoming" ? "Scheduled Sessions" : "Previous Records"}
            </h2>
          </div>
          <Badge className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-none font-bold rounded-full px-3">
            {sortedBookings.length} Total
          </Badge>
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
            <div className="py-32 text-center bg-white dark:bg-white/[0.01] rounded-[40px] border-2 border-dashed border-slate-200 dark:border-white/5">
              <div className="flex flex-col items-center gap-6 max-w-xs mx-auto">
                <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center justify-center">
                  <Calendar className="w-10 h-10 text-slate-200 dark:text-slate-800" />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-black text-slate-900 dark:text-white tracking-tight">No sessions found</p>
                  <p className="text-sm text-slate-400 font-medium">
                    You don't have any {tab} bookings at the moment.
                  </p>
                </div>
                {tab === "upcoming" && (
                  <Button className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black px-8">
                    Book a Session
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
