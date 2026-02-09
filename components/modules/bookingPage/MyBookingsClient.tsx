"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingCard } from "./BookingCard";

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
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {" "}
            {title ? title : "My Bookings"}
          </h1>
          <p className="text-muted-foreground">
            Manage your sessions and learning history.
          </p>
        </div>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <Button
            variant={tab === "upcoming" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("upcoming")}
            className={
              tab === "upcoming"
                ? "bg-white shadow-sm hover:bg-white text-black"
                : ""
            }
          >
            Upcoming
          </Button>
          <Button
            variant={tab === "past" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("past")}
            className={
              tab === "past"
                ? "bg-white shadow-sm hover:bg-white text-black"
                : ""
            }
          >
            Past
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {sortedBookings.length > 0 ? (
          sortedBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              userRole={userRole}
            />
          ))
        ) : (
          <div className="py-20 text-center border-2 border-dashed rounded-2xl text-slate-400">
            No {tab} bookings found.
          </div>
        )}
      </div>
    </div>
  );
}
