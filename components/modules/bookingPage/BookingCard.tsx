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
          "group overflow-hidden border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-lg bg-white dark:bg-slate-950",
          isReady && !isPast && booking.status === "CONFIRMED"
            ? "border-emerald-500/50 ring-1 ring-emerald-500/20"
            : "hover:border-rose-200 dark:hover:border-rose-900/40",
        )}
      >
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* 1. DATE BLOCK */}
            <div
              className={cn(
                "md:w-32 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r p-4",
                isReady && !isPast && booking.status === "CONFIRMED"
                  ? "bg-emerald-50 dark:bg-emerald-950/30"
                  : "bg-slate-50 dark:bg-slate-900/50",
              )}
            >
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">
                {new Date(booking.slotDate).toLocaleString("en-US", {
                  month: "short",
                })}
              </span>
              <span className="text-4xl font-black text-slate-900 dark:text-slate-100">
                {new Date(booking.slotDate).getDate()}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {new Date(booking.slotDate).getFullYear()}
              </span>
            </div>

            {/* 2. INFO BLOCK */}
            <div className="flex-1 p-6 space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border-none",
                    booking.status === "CONFIRMED" &&
                      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
                    booking.status === "CANCELLED" &&
                      "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400",
                    booking.status === "COMPLETED" &&
                      "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
                  )}
                >
                  {booking.status}
                </Badge>
                {isReady && !isPast && booking.status === "CONFIRMED" && (
                  <Badge className="bg-emerald-500 text-white animate-pulse text-[10px]">
                    LIVE NOW
                  </Badge>
                )}
                {isTutor &&
                  !booking.meetLink &&
                  booking.status === "CONFIRMED" && (
                    <Badge
                      variant="outline"
                      className="border-amber-200 text-amber-600 bg-amber-50 text-[10px]"
                    >
                      Link Required
                    </Badge>
                  )}
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                  {booking.category?.name || "Session"}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-sm">
                  <User size={14} /> with{" "}
                  {isTutor
                    ? booking.student?.name
                    : booking.tutorProfile?.user?.name}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100/50 dark:bg-slate-900/50 rounded-lg border dark:border-slate-800">
                  <Clock size={13} className="text-slate-400" />
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
                <div className="text-[11px] font-black text-rose-600 bg-rose-50 dark:bg-rose-950/30 px-2 py-1 rounded">
                  {formatCurrency(booking.totalPrice)}
                </div>
              </div>

              {booking.review && (
                <div className="p-3 bg-amber-50/40 dark:bg-amber-950/10 rounded-xl border border-amber-100/50 text-xs italic text-slate-600 dark:text-slate-400">
                  "{booking.review.content}"
                </div>
              )}
            </div>

            {/* 3. ACTION BLOCK */}
            <div className="p-6 bg-slate-50/50 dark:bg-slate-900/20 md:w-64 border-t md:border-t-0 md:border-l dark:border-slate-800 flex flex-col justify-center gap-3">
              {/* Tutor: Set Link */}
              {isTutor && !isPast && booking.status === "CONFIRMED" && (
                <Button
                  onClick={() => setIsLinkModalOpen(true)}
                  variant={booking.meetLink ? "outline" : "default"}
                  className="w-full h-11 font-bold rounded-xl"
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
                      "w-full h-11 font-bold rounded-xl transition-all",
                      isReady
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "bg-slate-200 text-slate-400",
                    )}
                  >
                    {isReady ? (
                      <>
                        <Video size={18} className="mr-2" /> Enter Classroom
                      </>
                    ) : (
                      <>
                        <Clock size={16} className="mr-2" /> Unlocks in 1m
                      </>
                    )}
                  </Button>
                )}

              {/* Tutor: Complete */}
              {canManageFullStatus && booking.status === "CONFIRMED" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full h-10 font-semibold rounded-xl"
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
                  className="w-full h-11 bg-amber-400 text-amber-950 font-bold rounded-xl"
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
                  className="w-full h-10 text-slate-500 hover:text-rose-600 font-medium rounded-xl"
                  onClick={() => handleStatusUpdate("CANCELLED")}
                >
                  <Ban size={14} className="mr-2" /> Request Cancellation
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TUTOR LINK MODAL */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="rounded-[24px] dark:bg-slate-950">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">
              Meeting Link
            </DialogTitle>
            <DialogDescription>
              Paste the Google Meet or Zoom URL below.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <label className="text-sm font-bold">Classroom URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              className="w-full p-3 rounded-xl border dark:bg-slate-900 outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsLinkModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-rose-600 text-white font-bold rounded-xl px-8"
              onClick={handleLinkUpdate}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Save Link"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* REVIEW MODAL */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="rounded-[24px] dark:bg-slate-950">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">
              Rate Lesson
            </DialogTitle>
            <DialogDescription>How was your experience?</DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-all hover:scale-125"
                >
                  <Star
                    size={40}
                    className={cn(
                      "transition-colors",
                      star <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200 dark:text-slate-800",
                    )}
                  />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="What did you learn? (Min 10 chars)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-xl"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsReviewModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-rose-600 text-white font-bold rounded-xl px-8"
              onClick={handleReviewSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" /> Submit..{" "}
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
