"use client";

import { Calendar, Clock, Video, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { getSessionStatus } from "@/lib/session-utils";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function StudentHero({ nextSession }: { nextSession: any }) {
    if (!nextSession) return <EmptyHeroState />;

    const { isReady, isPast } = getSessionStatus(
        nextSession.slotDate,
        nextSession.startTime,
        nextSession.endTime
    );

    if (isPast) return <EmptyHeroState />;
    const handleJoin = () => {
        if (nextSession.meetLink) {
            window.open(nextSession.meetLink, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="relative z-10">
                    <Badge className={cn(
                        "border-none mb-4 text-white font-bold",
                        isReady ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                    )}>
                        {isReady ? "Session Live" : "Upcoming Lesson"}
                    </Badge>

                    <h1 className="text-3xl font-black mb-1 tracking-tight">
                        Next session with {nextSession.tutorProfile?.user?.name}
                    </h1>
                    <p className="text-rose-400 dark:text-rose-500 font-bold mb-3 text-sm uppercase tracking-wider">
                        {nextSession.category?.name}
                    </p>
                    <p className="text-slate-400 flex items-center gap-2 text-sm font-medium">
                        <Calendar size={16} /> {formatDate(nextSession.slotDate)} •{" "}
                        <Clock size={16} /> {nextSession.startTime} - {nextSession.endTime}
                    </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
                    {isPast ? (
                        /* State for Expired Session */
                        <div className="flex flex-col gap-1">
                            <Button disabled className="bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700 px-8 h-12 rounded-2xl">
                                Class Finished
                            </Button>
                            <p className="text-xs text-slate-400 italic">This session has already concluded.</p>
                        </div>
                    ) : (
                        /* Existing Join Logic */
                        <Button
                            disabled={!isReady || !nextSession.meetLink}
                            onClick={handleJoin}
                            className={cn(
                                "font-bold px-8 h-12 rounded-2xl transition-all active:scale-95",
                                isReady && nextSession.meetLink
                                    ? "bg-white text-slate-900 hover:bg-slate-100 dark:bg-rose-600 dark:text-white"
                                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                            )}
                        >
                            <Video className="mr-2 h-5 w-5" />
                            {isReady ? "Join Classroom" : "Link active 5m before"}
                        </Button>
                    )}

                    {!nextSession.meetLink && isReady && !isPast && (
                        <span className="text-xs text-amber-400 italic animate-pulse">Waiting for tutor to add link...</span>
                    )}
                </div>

                {/* Decorative Background Glow */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-rose-500/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
            </div>

            <SidebarActionCard />
        </div>
    );
}

function SidebarActionCard() {
    return (
        <Card className="border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center p-6 bg-rose-50/30 dark:bg-slate-900/40 border-dashed border-2">
            <div className="space-y-4 text-center">
                <div className="bg-white dark:bg-slate-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <BookOpen className="text-rose-600 dark:text-rose-500" size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">New Subjects?</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Explore over 500+ expert tutors.</p>
                </div>
                <Button asChild className="w-full bg-rose-600 hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-700 text-white font-bold rounded-xl">
                    <Link href='/tutors'>Find a Tutor</Link>
                </Button>
            </div>
        </Card>
    );
}

function EmptyHeroState() {
    return (
        <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-[280px]">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">No sessions scheduled</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">Start your learning journey today.</p>
            <Button asChild className="bg-slate-900 dark:bg-rose-600 dark:hover:bg-rose-700 text-white font-bold rounded-xl px-8">
                <Link href='/tutors'>Book Now</Link>
            </Button>
        </div>
    );
}