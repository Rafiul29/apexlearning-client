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
  Lock,
  UserCheck,
  UserX,
  Calendar,
  User,
  Loader2,
  Link2,
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
    booking.endTime,
    // "2026-02-06",
    // "23:22",
    // "23:40",
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
      const promise = updateBookingStatusAction(
        booking.id,
        BookingStatus.CONFIRMED,
        meetLink,
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

  return (
    <>
      <Card
        className={cn(
          "group overflow-hidden border-slate-200 dark:border-white/5 transition-all duration-500 hover:shadow-2xl bg-white dark:bg-white/[0.02] rounded-[32px]",
          isReady && !isPast && booking.status === "CONFIRMED"
            ? "border-emerald-500/50 ring-4 ring-emerald-500/5"
            : "hover:border-emerald-500/30",
        )}
      >
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* 1. DATE BLOCK */}
            <div
              className={cn(
                "md:w-36 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r dark:border-white/5 p-6 transition-colors duration-500",
                isReady && !isPast && booking.status === "CONFIRMED"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-50 dark:bg-white/5",
              )}
            >
              <span className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] mb-1",
                isReady && !isPast && booking.status === "CONFIRMED" ? "text-emerald-100" : "text-slate-400 dark:text-slate-500"
              )}>
                {new Date(booking.slotDate).toLocaleString("en-US", {
                  month: "short",
                })}
              </span>
              <span className="text-5xl font-black tracking-tighter leading-none">
                {new Date(booking.slotDate).getDate()}
              </span>
              <span className={cn(
                "text-[10px] font-black mt-1 uppercase tracking-widest",
                isReady && !isPast && booking.status === "CONFIRMED" ? "text-emerald-200" : "text-slate-400"
              )}>
                {new Date(booking.slotDate).getFullYear()}
              </span>
            </div>

            {/* 2. INFO BLOCK */}
            <div className="flex-1 p-8 space-y-6">
              <div className="flex flex-wrap gap-3 items-center">
                <Badge
                  className={cn(
                    "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-none",
                    booking.status === "CONFIRMED" &&
                      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                    booking.status === "CANCELLED" &&
                      "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                    booking.status === "COMPLETED" &&
                      "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                  )}
                >
                  {booking.status}
                </Badge>
                {isReady && !isPast && booking.status === "CONFIRMED" && (
                  <Badge className="bg-emerald-500 text-white animate-pulse text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full border-none">
                    LIVE NOW
                  </Badge>
                )}
                {isTutor &&
                  !booking.meetLink &&
                  booking.status === "CONFIRMED" && (
                    <Badge
                      variant="outline"
                      className="border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full"
                    >
                      Link Required
                    </Badge>
                  )}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {booking.category?.name || "Private Session"}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm bg-slate-50 dark:bg-white/5 w-fit px-3 py-1 rounded-lg">
                  <User size={14} className="text-emerald-500" />
                  <span className="text-slate-400 uppercase text-[10px] tracking-widest font-black mr-1">{isTutor ? "STUDENT:" : "TUTOR:"}</span>
                  <span className="text-slate-900 dark:text-slate-200">
                    {isTutor
                      ? booking.student?.name
                      : booking.tutorProfile?.user?.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-xl border border-emerald-500/10">
                  <Clock size={14} className="text-emerald-500" />
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
                <div className="text-[11px] font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-4 py-2 rounded-xl uppercase tracking-widest">
                  {formatCurrency(booking.totalPrice)}
                </div>
              </div>

              {booking.review && (
                <div className="p-4 bg-amber-50/40 dark:bg-amber-500/5 rounded-2xl border border-amber-100/50 dark:border-amber-500/10 text-sm font-medium italic text-slate-600 dark:text-slate-400 relative overflow-hidden group/review">
                  <Star className="absolute -right-2 -bottom-2 w-12 h-12 text-amber-500/10 transform rotate-12 transition-transform group-hover/review:rotate-45" />
                  "{booking.review.content}"
                </div>
              )}
            </div>

            {/* 3. ACTION BLOCK */}
            <div className="p-8 bg-slate-50/50 dark:bg-white/[0.01] md:w-72 border-t md:border-t-0 md:border-l dark:border-white/5 flex flex-col justify-center gap-4">
              {/* Tutor: Set Link */}
              {isTutor && !isPast && booking.status === "CONFIRMED" && (
                <Button
                  onClick={() => setIsLinkModalOpen(true)}
                  variant={booking.meetLink ? "outline" : "default"}
                  className={cn(
                    "w-full h-14 font-black rounded-full uppercase tracking-widest text-[10px] shadow-lg transition-all active:scale-95",
                    booking.meetLink 
                      ? "border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5" 
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  )}
                >
                  <Link2 size={18} className="mr-2" />{" "}
                  {booking.meetLink ? "Update Link" : "Set Link"}
                </Button>
              )}

              {/* Standard: Join */}
              {booking.status === "CONFIRMED" &&
                !isPast &&
                booking.meetLink && (
                  <Button
                    size="lg"
                    disabled={!isReady}
                    onClick={() => window.open(booking.meetLink, "_blank")}
                    className={cn(
                      "w-full h-14 font-black rounded-full transition-all uppercase tracking-widest text-[10px] shadow-xl active:scale-95",
                      isReady
                        ? "bg-emerald-600 text-white shadow-emerald-500/20 hover:bg-emerald-700"
                        : "bg-slate-200 dark:bg-white/5 text-slate-400 cursor-not-allowed",
                    )}
                  >
                    {isReady ? (
                      <>
                        <Video size={18} className="mr-2" /> Enter Classroom
                      </>
                    ) : (
                      <>
                        <Clock size={18} className="mr-2" /> Link Active Soon
                      </>
                    )}
                  </Button>
                )}

              {/* Tutor: Complete */}
              {canManageFullStatus && booking.status === "CONFIRMED" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-12 font-black rounded-full uppercase tracking-widest text-[10px] border-slate-200 dark:border-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all"
                  onClick={() => handleStatusUpdate("COMPLETED")}
                >
                  <CheckCircle size={16} className="mr-2 text-emerald-500" />{" "}
                  Finalize Lesson
                </Button>
              )}

              {/* Student: Review */}
              {isStudent && booking.isAttended && !booking.review && (
                <Button
                  size="lg"
                  className="w-full h-14 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-full uppercase tracking-widest text-[10px] shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                  onClick={() => setIsReviewModalOpen(true)}
                >
                  <Star size={18} className="mr-2 fill-amber-950" /> Rate
                  Experience
                </Button>
              )}

              {/* Cancel */}
              {!isReady && !isPast && booking.status === "CONFIRMED" && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full h-12 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-bold rounded-full text-[10px] uppercase tracking-widest transition-all"
                  onClick={() => handleStatusUpdate("CANCELLED")}
                >
                  <Ban size={16} className="mr-2" /> Cancel Session
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TUTOR LINK MODAL */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="rounded-[32px] dark:bg-[#0a0a0a] border-slate-200 dark:border-white/10 p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-black tracking-tighter">
              Classroom <span className="text-emerald-600">Link</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
              Share the Google Meet, Zoom, or Teams URL with your student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Classroom URL</label>
            <div className="relative group">
               <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
               <input
                type="url"
                placeholder="https://meet.google.com/..."
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all font-medium text-sm"
              />
            </div>
          </div>
          <DialogFooter className="mt-8 gap-3 sm:gap-0">
            <Button variant="ghost" className="rounded-full font-bold px-6" onClick={() => setIsLinkModalOpen(false)}>
              Discard
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full px-10 h-12 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              onClick={handleLinkUpdate}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Publish Link"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* REVIEW MODAL */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="rounded-[32px] dark:bg-[#0a0a0a] border-slate-200 dark:border-white/10 p-8 max-w-md">
          <DialogHeader className="mb-8 text-center">
            <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
               <Star className="text-amber-500 fill-amber-500" size={40} />
            </div>
            <DialogTitle className="text-3xl font-black tracking-tighter">
              Rate your <span className="text-amber-500">Lesson</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 font-medium">
              Your feedback helps us maintain high quality tutoring.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8">
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-all hover:scale-125 active:scale-90"
                >
                  <Star
                    size={36}
                    className={cn(
                      "transition-all duration-300",
                      star <= rating
                        ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                        : "text-slate-200 dark:text-white/10",
                    )}
                  />
                </button>
              ))}
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Describe your experience</label>
               <Textarea
                placeholder="What did you learn today? Was the tutor helpful?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 min-h-[120px] focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all font-medium"
              />
            </div>
          </div>
          <DialogFooter className="mt-10 sm:justify-center">
            <Button
              className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-full h-14 shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-sm uppercase tracking-widest"
              onClick={handleReviewSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
