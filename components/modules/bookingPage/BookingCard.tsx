"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Video, Ban, CheckCircle, Star, ExternalLink, Lock, UserCheck, UserX, MessageSquareText, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateBookingStatusAction } from "@/actions/booking";
import { submitReviewAction } from "@/actions/review";

export function BookingCard({ booking, userRole }: { booking: any; userRole: string }) {
    const [now, setNow] = useState(new Date());
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const isAdmin = userRole === "ADMIN";
    const isTutor = userRole === "TUTOR";
    const isStudent = userRole === "STUDENT";
    const canManageFullStatus = isAdmin || isTutor;

    const dateObj = new Date(booking.slotDate);
    const isPastDate = dateObj < now;

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(timer);
    }, []);

    const isJoinable = () => {
        if (!booking.meetLink || booking.status !== "CONFIRMED") return false;
        const [hours, minutes] = booking.startTime.split(":").map(Number);
        const startDateTime = new Date(booking.slotDate);
        startDateTime.setHours(hours, minutes, 0, 0);
        const fiveMinutesInMs = 5 * 60 * 1000;
        return now.getTime() >= (startDateTime.getTime() - fiveMinutesInMs);
    };

    const handleStatusUpdate = async (newStatus: string) => {
        if (isStudent && newStatus !== "CANCELLED") return;
        const promise = updateBookingStatusAction(booking.id, newStatus);
        toast.promise(promise, {
            loading: 'Updating status...',
            success: `Lesson marked as ${newStatus.toLowerCase()}`,
            error: 'Failed to update'
        });
    };

    const handleReviewSubmit = async (bookingId: string, tutorProfileId: string) => {
        if (comment.length < 10) {
            return toast.error("Please write a bit more (at least 10 characters).");
        }

        setIsLoading(true);

        const payload = {
            rating,
            content: comment,
            bookingId,
            tutorProfileId,
        };

        try {
            const result = await submitReviewAction(payload);

            if (result.success) {
                toast.success("Review submitted! Thank you for your feedback.");
                setIsReviewModalOpen(false);
                setComment("");
            } else {
                toast.error(result.message || "Failed to save review.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card className="overflow-hidden hover:border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md">
                <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row items-stretch">
                        {/* Date Block */}
                        <div className="bg-slate-50 p-6 flex flex-col items-center justify-center border-r w-full md:w-32">
                            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                                {dateObj.toLocaleString("en-US", { month: "short" })}
                            </span>
                            <span className="text-3xl font-black text-slate-900">
                                {dateObj.getDate()}
                            </span>
                        </div>

                        {/* Info Block */}
                        <div className="flex-2 p-6 space-y-3">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <Badge className={cn("font-semibold",
                                        booking.status === "CONFIRMED" && "bg-emerald-100 text-emerald-700",
                                        booking.status === "CANCELLED" && "bg-rose-100 text-rose-700",
                                        booking.status === "COMPLETED" && "bg-blue-100 text-blue-700")}>
                                        {booking.status}
                                    </Badge>

                                    {(isPastDate || booking.status === "COMPLETED") && booking.status !== "CANCELLED" && (
                                        <Badge variant="outline" className={cn("gap-1 py-0.5",
                                            booking.isAttended ? "border-emerald-200 text-emerald-600" : "text-slate-500")}>
                                            {booking.isAttended ? <><UserCheck size={12} /> Attended</> : <><UserX size={12} /> No-show</>}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-slate-900">{booking.category.name}</h3>
                                <p className="text-slate-500 font-medium text-sm">with {booking.tutorProfile.user.name}</p>
                            </div>
                        </div>

                        {/* Action Block */}
                        <div className="p-6 border-t md:border-t-0 md:border-l flex flex-row md:flex-col items-center justify-center gap-3 bg-white min-w-[180px]">
                            {/* Join Button */}
                            {booking.status === "CONFIRMED" && !isPastDate && (
                                <Button size="sm" disabled={!isJoinable()} onClick={() => window.open(booking.meetLink, "_blank")} className={cn("w-full transition-all", isJoinable() ? "bg-rose-600 hover:bg-rose-700" : "bg-slate-700 text-white")}>
                                    {isJoinable() ? <><ExternalLink size={16} className="mr-2" /> Join Now</> : <><Lock size={16} className="mr-2" /> Join in 5m</>}
                                </Button>
                            )}

                            {/* Complete Button (Admin/Tutor Only) */}
                            {canManageFullStatus && booking.status === "CONFIRMED" && (
                                <Button size="sm" variant="outline" className="w-full text-blue-600 border-blue-200" onClick={() => handleStatusUpdate("COMPLETED")}>
                                    <CheckCircle size={16} className="mr-2" /> Complete
                                </Button>
                            )}

                            {/* REVIEW BUTTON: Only if Student, Completed, Attended, and NO PREVIOUS REVIEW */}
                            {isStudent && booking.status === "COMPLETED" && booking.isAttended && !booking.review && (
                                <Button size="sm" variant="secondary" className="w-full bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100" onClick={() => setIsReviewModalOpen(true)}>
                                    <Star size={16} className="mr-2 fill-amber-500 text-amber-500" /> Leave Review
                                </Button>
                            )}

                            {/* Review Display for Student */}
                            {booking.status === "COMPLETED" && booking.isAttended && booking.review && (
                                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 animate-in fade-in slide-in-from-top-1 duration-500">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    className={cn(
                                                        i < booking.review.rating
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-slate-300"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            Your Review
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 italic line-clamp-2">
                                        "{booking.review.content}"
                                    </p>
                                </div>
                            )}

                            {/* Cancel Button */}
                            {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
                                <Button size="sm" variant="ghost" className="w-full text-rose-500 hover:bg-rose-50" onClick={() => handleStatusUpdate("CANCELLED")}>
                                    <Ban size={16} className="mr-2" /> Cancel
                                </Button>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* REVIEW MODAL */}
            <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Rate your session</DialogTitle>
                        <DialogDescription>
                            How was your lesson with {booking.tutorProfile.user.name}? Your feedback helps tutors improve.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => setRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                                    <Star size={32} className={cn(star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300")} />
                                </button>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Your comments</label>
                            <Textarea placeholder="What did you learn? Was the tutor helpful?" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsReviewModalOpen(false)}>Cancel</Button>
                        <Button
                            className="bg-rose-600 hover:bg-rose-700 text-white min-w-[140px]"
                            onClick={() => handleReviewSubmit(booking.id, booking.tutorProfile.id)}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
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