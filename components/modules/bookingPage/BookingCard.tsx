"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Video,
  Ban,
  CheckCircle,
  Star,
  ShieldCheck,
  Calendar,
  User,
  Loader2,
  Link2,
  MoreVertical,
  ChevronRight,
  DollarSign
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateBookingStatusAction } from "@/actions/booking";
import { submitReviewAction } from "@/actions/review";
import { getSessionStatus } from "@/lib/session-utils";
import { formatDate, formatCurrency } from "@/lib/format";
import { BookingStatus } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function BookingCard({
  booking,
  userRole,
}: {
  booking: any;
  userRole: string;
}) {
  const [now, setNow] = useState(new Date());
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [meetLink, setMeetLink] = useState(booking.meetLink || "");
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = userRole === "ADMIN";
  const isTutor = userRole === "TUTOR";
  const isStudent = userRole === "STUDENT";
  const canManageFullStatus = isAdmin || isTutor;

  const { isReady, isPast } = getSessionStatus(
    booking.slotDate,
    booking.startTime,
    booking.endTime
  );

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleStatusUpdate = async (newStatus: string) => {
    if (isStudent && newStatus !== "CANCELLED") return;
    const promise = updateBookingStatusAction(booking.id, newStatus);
    toast.promise(promise, {
      loading: "Updating status...",
      success: `Lesson marked as ${newStatus.toLowerCase()}`,
      error: "Failed to update",
    });
  };

  const handleLinkUpdate = async () => {
    if (!meetLink.startsWith("http")) {
      return toast.error("Please enter a valid URL (http/https)");
    }
    setIsLoading(true);
    try {
      await updateBookingStatusAction(
        booking.id,
        BookingStatus.CONFIRMED,
        meetLink
      );
      toast.success("Meeting link updated");
      setIsLinkModalOpen(false);
    } catch (error) {
      toast.error("Failed to update link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (comment.length < 10) return toast.error("Min 10 characters required");
    setIsLoading(true);
    try {
      const result = await submitReviewAction({
        rating,
        content: comment,
        bookingId: booking.id,
        tutorProfileId: booking.tutorProfileId,
      });
      if (result.success) {
        toast.success("Review submitted");
        setIsReviewModalOpen(false);
      }
    } catch (error) {
      toast.error("Error submitting review");
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors = {
    CONFIRMED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    CANCELLED: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    COMPLETED: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  };

  return (
    <>
      <Card
        className={cn(
          "group overflow-hidden border-slate-200 dark:border-white/5 transition-all duration-300 bg-white dark:bg-white/[0.02] rounded-[24px] relative",
          isReady && !isPast && booking.status === "CONFIRMED"
            ? "border-emerald-500/50 ring-2 ring-emerald-500/5"
            : "hover:border-emerald-500/30"
        )}
      >
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* 1. DATE BLOCK */}
            <div
              className={cn(
                "md:w-32 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r dark:border-white/5 p-5 transition-all duration-300",
                isReady && !isPast && booking.status === "CONFIRMED"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-50 dark:bg-white/[0.03]"
              )}
            >
              <span className={cn(
                "text-[9px] font-black uppercase tracking-[0.2em] mb-1",
                isReady && !isPast && booking.status === "CONFIRMED" ? "text-emerald-100" : "text-slate-400 dark:text-slate-500"
              )}>
                {new Date(booking.slotDate).toLocaleString("en-US", { month: "short" })}
              </span>
              <span className="text-4xl font-black tracking-tighter leading-none">
                {new Date(booking.slotDate).getDate()}
              </span>
              <span className={cn(
                "text-[10px] font-bold mt-1 uppercase tracking-widest",
                isReady && !isPast && booking.status === "CONFIRMED" ? "text-emerald-200" : "text-slate-500 dark:text-slate-400"
              )}>
                {new Date(booking.slotDate).toLocaleString("en-US", { weekday: "short" })}
              </span>
            </div>

            {/* 2. INFO BLOCK */}
            <div className="flex-1 p-5 md:p-6 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge
                    className={cn(
                      "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border-none shadow-sm",
                      statusColors[booking.status as keyof typeof statusColors] || "bg-slate-100 text-slate-500"
                    )}
                  >
                    {booking.status}
                  </Badge>
                  {isReady && !isPast && booking.status === "CONFIRMED" && (
                    <div className="flex items-center gap-1.5 bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Live Session
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  #{booking.id.slice(-6).toUpperCase()}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    {booking.category?.name || "Private Session"}
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-slate-200 dark:border-white/10">
                      <AvatarImage src={isTutor ? booking.student?.image : booking.tutorProfile?.user?.image} />
                      <AvatarFallback className="bg-slate-100 dark:bg-white/10 text-slate-500 text-[10px] font-bold">
                        {(isTutor ? booking.student?.name : booking.tutorProfile?.user?.name)?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">{isTutor ? "Learner" : "Instructor"}</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-200">
                        {isTutor ? booking.student?.name : booking.tutorProfile?.user?.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                       <Clock size={14} className="text-emerald-500" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Time</span>
                       <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                         {booking.startTime} - {booking.endTime}
                       </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                       <DollarSign size={14} className="text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">Price</span>
                       <span className="text-[11px] font-black text-slate-900 dark:text-white tracking-widest">
                         {formatCurrency(booking.totalPrice)}
                       </span>
                    </div>
                  </div>
                </div>
              </div>

              {booking.review && (
                <div className="p-4 bg-amber-50/30 dark:bg-amber-500/[0.03] rounded-2xl border border-amber-100/50 dark:border-amber-500/10 text-[13px] font-medium italic text-slate-600 dark:text-slate-400 leading-relaxed">
                  "{booking.review.content}"
                </div>
              )}
            </div>

            {/* 3. ACTION BLOCK */}
            <div className="p-5 md:p-6 bg-slate-50/50 dark:bg-white/[0.01] md:w-64 border-t md:border-t-0 md:border-l dark:border-white/5 flex flex-col justify-center gap-3">
              {isTutor && !isPast && booking.status === "CONFIRMED" && (
                <Button
                  onClick={() => setIsLinkModalOpen(true)}
                  className={cn(
                    "w-full h-11 font-black rounded-full uppercase tracking-widest text-[9px] shadow-sm transition-all active:scale-95",
                    booking.meetLink 
                      ? "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:bg-slate-50" 
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/10"
                  )}
                >
                  <Link2 size={16} className="mr-2" />{" "}
                  {booking.meetLink ? "Update Link" : "Set Link"}
                </Button>
              )}

              {booking.status === "CONFIRMED" &&
                !isPast &&
                booking.meetLink && (
                  <Button
                    size="lg"
                    disabled={!isReady}
                    onClick={() => window.open(booking.meetLink, "_blank")}
                    className={cn(
                      "w-full h-11 font-black rounded-full transition-all uppercase tracking-widest text-[9px] shadow-md active:scale-95",
                      isReady
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed border-slate-200 dark:border-white/5",
                    )}
                  >
                    {isReady ? (
                      <>
                        <Video size={16} className="mr-2" /> Join Session
                      </>
                    ) : (
                      <>
                        <Clock size={16} className="mr-2" /> Waiting...
                      </>
                    )}
                  </Button>
                )}

              {canManageFullStatus && booking.status === "CONFIRMED" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-11 font-black rounded-full uppercase tracking-widest text-[9px] border-slate-200 dark:border-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all"
                  onClick={() => handleStatusUpdate("COMPLETED")}
                >
                  <CheckCircle size={14} className="mr-2 text-emerald-500" />{" "}
                  Complete
                </Button>
              )}

              {isStudent && booking.isAttended && !booking.review && (
                <Button
                  size="lg"
                  className="w-full h-11 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-full uppercase tracking-widest text-[9px] shadow-sm transition-all active:scale-95"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  <Star size={16} className="mr-2 fill-amber-950" /> Review Lesson
                </Button>
              )}

              <div className="flex gap-2">
                {!isReady && !isPast && booking.status === "CONFIRMED" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1 h-10 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 font-bold rounded-full text-[9px] uppercase tracking-widest transition-all"
                    onClick={() => handleStatusUpdate("CANCELLED")}
                  >
                    <Ban size={14} className="mr-2" /> Cancel
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-10 w-10 p-0 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-slate-500"
                >
                  <MoreVertical size={14} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TUTOR LINK MODAL */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="rounded-[32px] dark:bg-[#0a0a0a] border-slate-200 dark:border-white/10 p-8 max-w-md">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Meeting <span className="text-emerald-600">Link</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
              Share the session URL with your student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
             <div className="relative">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="url"
                  placeholder="https://meet.google.com/..."
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all font-bold text-sm"
                />
             </div>
          </div>
          <DialogFooter className="mt-8 gap-3">
            <Button variant="ghost" className="rounded-full font-bold px-6 h-11" onClick={() => setIsLinkModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full px-8 h-11 shadow-md active:scale-95 transition-all text-xs uppercase tracking-widest"
              onClick={handleLinkUpdate}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Save Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* REVIEW MODAL */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="rounded-[32px] dark:bg-[#0a0a0a] border-slate-200 dark:border-white/10 p-8 max-w-md">
          <DialogHeader className="mb-6 text-center">
            <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Rate your <span className="text-amber-500">Lesson</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
              Share your feedback about the session.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="focus:outline-none transition-transform hover:scale-110 active:scale-90">
                  <Star size={32} className={cn(star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-white/10")} />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="How was the session? Was it helpful?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 min-h-[100px] focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all font-bold text-sm shadow-inner"
            />
          </div>
          <DialogFooter className="mt-8">
            <Button
              className="w-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-full h-12 shadow-md active:scale-95 transition-all text-xs uppercase tracking-[0.1em]"
              onClick={handleReviewSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit Review"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

