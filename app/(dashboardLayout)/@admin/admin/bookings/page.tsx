"use client";

import React from "react";
import { 
  Search, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  MoreVertical,
  Download,
  Filter,
  DollarSign
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_BOOKINGS = [
  { 
    id: "BOK-921", 
    student: "Liam Neeson", 
    tutor: "Prof. Snape", 
    subject: "Potions", 
    date: "Feb 05, 2026", 
    time: "10:00 AM", 
    amount: 45.00, 
    status: "Confirmed" 
  },
  { 
    id: "BOK-922", 
    student: "Hermione Granger", 
    tutor: "Minerva McGonagall", 
    subject: "Transfiguration", 
    date: "Feb 05, 2026", 
    time: "02:30 PM", 
    amount: 60.00, 
    status: "Completed" 
  },
  { 
    id: "BOK-923", 
    student: "Ron Weasley", 
    tutor: "Remus Lupin", 
    subject: "Defense Arts", 
    date: "Feb 06, 2026", 
    time: "11:00 AM", 
    amount: 35.00, 
    status: "Pending" 
  },
  { 
    id: "BOK-924", 
    student: "Draco Malfoy", 
    tutor: "Gilderoy Lockhart", 
    subject: "Charms", 
    date: "Feb 04, 2026", 
    time: "09:00 AM", 
    amount: 25.00, 
    status: "Cancelled" 
  },
];

export default function BookingsManagementPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
          <p className="text-muted-foreground font-medium">Monitor and manage all tutoring sessions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Button className="bg-rose-600 hover:bg-rose-700">New Booking</Button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-50 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><Clock size={16}/> Scheduled Today</div>
            <div className="text-2xl font-bold mt-1">12 Sessions</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><DollarSign size={16}/> Revenue (Feb)</div>
            <div className="text-2xl font-bold mt-1">$4,280.00</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-none">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium"><AlertCircle size={16}/> Disputes</div>
            <div className="text-2xl font-bold mt-1 text-rose-600">2 Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search by student, tutor, or ID..." className="pl-10" />
        </div>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter Status</Button>
      </div>

      {/* Table */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_BOOKINGS.map((booking) => (
              <TableRow key={booking.id} className="hover:bg-slate-50/30">
                <TableCell className="font-mono text-xs font-bold text-slate-500">{booking.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">S: {booking.student}</span>
                    <span className="text-xs text-slate-500 text-rose-600">T: {booking.tutor}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span className="flex items-center gap-1 font-medium"><Calendar size={12}/> {booking.date}</span>
                    <span className="text-xs text-slate-500">{booking.time}</span>
                  </div>
                </TableCell>
                <TableCell className="font-bold">${booking.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={getStatusStyle(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Booking Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer"><CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" /> Mark Completed</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer"><XCircle className="mr-2 h-4 w-4 text-rose-500" /> Cancel Booking</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">View Transaction</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Message Participants</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

// Helper to style status badges
function getStatusStyle(status: string) {
  switch (status) {
    case "Completed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "Confirmed": return "bg-blue-50 text-blue-700 border-blue-100";
    case "Pending": return "bg-amber-50 text-amber-700 border-amber-100";
    case "Cancelled": return "bg-slate-100 text-slate-500 border-slate-200";
    default: return "";
  }
}