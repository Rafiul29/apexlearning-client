"use client";

import React from "react";
import { Calendar, Clock, MapPin, MoreVertical, Video, MessageSquare, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const MY_BOOKINGS = [
  {
    id: "BK-99",
    tutorName: "Dr. Aris Thorne",
    subject: "Advanced Calculus",
    date: "Feb 10, 2026",
    time: "4:00 PM",
    status: "Upcoming",
    type: "Online",
  },
  {
    id: "BK-82",
    tutorName: "Sarah Jenkins",
    subject: "Organic Chemistry",
    date: "Jan 28, 2026",
    time: "2:00 PM",
    status: "Completed",
    type: "Online",
  }
];

export default function MyBookingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground">Manage your lessons and learning history.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Past</Button>
          <Button variant="default" size="sm" className="bg-rose-600">Upcoming</Button>
        </div>
      </div>

      <div className="grid gap-4">
        {MY_BOOKINGS.map((booking) => (
          <Card key={booking.id} className="overflow-hidden hover:border-rose-200 transition-colors">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center">
                {/* Date Side-block */}
                <div className="bg-slate-50 p-6 flex flex-col items-center justify-center border-r w-full md:w-32">
                  <span className="text-xs font-bold uppercase text-slate-400">Feb</span>
                  <span className="text-2xl font-black text-slate-900">10</span>
                </div>

                {/* Info Block */}
                <div className="flex-1 p-6 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className={booking.status === "Upcoming" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"}>
                        {booking.status}
                      </Badge>
                      <h3 className="text-xl font-bold mt-1">{booking.subject}</h3>
                      <p className="text-slate-500 font-medium">with {booking.tutorName}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical size={18} /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Message Tutor</DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600">Cancel Lesson</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 pt-2">
                    <span className="flex items-center gap-1"><Clock size={14}/> {booking.time}</span>
                    <span className="flex items-center gap-1"><Video size={14}/> {booking.type}</span>
                    <span className="flex items-center gap-1"><MapPin size={14}/> Zoom Meeting</span>
                  </div>
                </div>

                {/* Action Block */}
                <div className="p-6 border-t md:border-t-0 md:border-l flex gap-2">
                  <Button variant="outline" size="sm"><MessageSquare size={16} className="mr-2"/> Chat</Button>
                  {booking.status === "Upcoming" ? (
                    <Button size="sm" className="bg-rose-600 hover:bg-rose-700">Join Call</Button>
                  ) : (
                    <Button size="sm" variant="secondary"><Star size={16} className="mr-2"/> Review</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}