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
    nextSession.endTime,
  );

  if (isPast) return <EmptyHeroState />;
  const handleJoin = () => {
    if (nextSession.meetLink) {
      window.open(nextSession.meetLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 bg-slate-900 dark:bg-emerald-950/20 border border-slate-800 dark:border-emerald-500/10 rounded-[32px] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all group">
        <div className="relative z-10">
          <Badge
            className={cn(
              "border-none mb-6 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
              isReady ? "bg-emerald-500 animate-pulse" : "bg-emerald-600/50 backdrop-blur-md",
            )}
          >
            {isReady ? "Session Live" : "Upcoming Lesson"}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tighter leading-tight">
            Next session with <span className="text-emerald-400">{nextSession.tutorProfile?.user?.name}</span>
          </h1>
          <p className="text-emerald-500 dark:text-emerald-400 font-black mb-4 text-xs uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {nextSession.category?.name}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
             <div className="flex items-center gap-2 text-sm font-bold bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Calendar size={14} className="text-emerald-400" /> {formatDate(nextSession.slotDate)}
             </div>
             <div className="flex items-center gap-2 text-sm font-bold bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <Clock size={14} className="text-emerald-400" /> {nextSession.startTime} - {nextSession.endTime}
             </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
          {isPast ? (
            <div className="flex flex-col gap-1">
              <Button
                disabled
                className="bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700 px-8 h-14 rounded-full font-black text-sm uppercase tracking-widest"
              >
                Class Finished
              </Button>
            </div>
          ) : (
            <Button
              disabled={!isReady || !nextSession.meetLink}
              onClick={handleJoin}
              className={cn(
                "font-black px-10 h-14 rounded-full transition-all active:scale-95 text-sm uppercase tracking-widest shadow-xl",
                isReady && nextSession.meetLink
                  ? "bg-white text-slate-900 hover:bg-slate-100 shadow-emerald-500/20"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700",
              )}
            >
              <Video className="mr-2 h-5 w-5" />
              {isReady ? "Join Classroom" : "Link active 1m before"}
            </Button>
          )}

          {!nextSession.meetLink && isReady && !isPast && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
               <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest animate-pulse">
                Waiting for tutor to add link...
              </span>
            </div>
          )}
        </div>

        {/* Decorative Background Glow */}
        <div className="absolute top-[-40%] right-[-10%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
      </div>

      <SidebarActionCard />
    </div>
  );
}

function SidebarActionCard() {
  return (
    <Card className="border-slate-200 dark:border-white/5 shadow-sm flex flex-col justify-center p-8 bg-white dark:bg-white/[0.02] border-dashed border-2 rounded-[32px] transition-all hover:border-emerald-500/30">
      <div className="space-y-6 text-center">
        <div className="bg-emerald-50 dark:bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm group transform hover:rotate-12 transition-transform">
          <BookOpen className="text-emerald-600 dark:text-emerald-400" size={28} />
        </div>
        <div>
          <h3 className="font-black text-xl text-slate-900 dark:text-white tracking-tight">
            New Subjects?
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Explore over 500+ expert tutors worldwide.
          </p>
        </div>
        <Button
          asChild
          className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-black rounded-full h-14 shadow-lg shadow-emerald-500/10"
        >
          <Link href="/tutors">Find a Tutor</Link>
        </Button>
      </div>
    </Card>
  );
}

function EmptyHeroState() {
  return (
    <div className="md:col-span-2 bg-white dark:bg-white/[0.02] border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[32px] p-10 flex flex-col items-center justify-center text-center h-[300px] shadow-sm">
      <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
         <Calendar className="text-slate-300 dark:text-slate-600" size={32} />
      </div>
      <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
        No sessions scheduled
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm font-medium">
        Start your learning journey today by booking your first lesson.
      </p>
      <Button
        asChild
        className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black rounded-full px-10 h-14 shadow-lg active:scale-95 transition-all"
      >
        <Link href="/tutors">Book Now</Link>
      </Button>
    </div>
  );
}
