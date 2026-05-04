import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, CalendarCheck, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Badge } from '@/components/ui/badge'

const UpcomingSession = ({ sessions = [] }: { sessions: any[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
              <CalendarCheck className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
            </div>
            Upcoming Sessions
          </h2>
          <Button variant="ghost" size="sm" className="text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-full px-4">
            View Schedule
          </Button>
        </div>

        {sessions.length > 0 ? (
          <div className="grid gap-4">
            {sessions.map((session) => {
              const dateObj = new Date(session.slotDate);
              const month = dateObj.toLocaleString("en-US", { month: "short" });
              const day = dateObj.getDate().toString().padStart(2, '0');

              return (
                <Card
                  key={session.id}
                  className="group hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all cursor-pointer shadow-sm border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] rounded-[24px] overflow-hidden"
                >
                  <CardContent className="p-5 flex items-center gap-5">
                    {/* Dynamic Date Block */}
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-4 rounded-2xl text-center min-w-[70px] group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
                      <span className="block text-[10px] font-black uppercase tracking-widest leading-tight">
                        {month}
                      </span>
                      <span className="text-2xl font-black leading-none tracking-tighter">
                        {day}
                      </span>
                    </div>

                    {/* Session Details */}
                    <div className="flex-1">
                      <h4 className="font-black text-slate-900 dark:text-white tracking-tight text-lg leading-tight mb-1">
                        {session.category?.name || "Private Tutoring"}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-bold">
                        <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                        Student: <span className="text-slate-700 dark:text-slate-200">{session.student?.user?.name || "Valued Student"}</span>
                      </div>
                    </div>

                    {/* Time & Status */}
                    <div className="text-right hidden md:block px-6 border-x border-slate-100 dark:border-white/5">
                      <p className="text-sm font-black text-slate-900 dark:text-white mb-1">
                        {session.startTime} - {session.endTime}
                      </p>
                      <Badge variant="outline" className={cn(
                        "text-[9px] px-3 py-0.5 rounded-full font-black uppercase tracking-widest border-none",
                        session.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-slate-100 dark:bg-white/5 text-slate-500"
                      )}>
                        {session.status}
                      </Badge>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-dashed border-2 bg-slate-50/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 rounded-[32px]">
            <CardContent className="p-16 text-center text-slate-400 font-medium">
              No upcoming sessions found for this week.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Column: Analytics & Quick Stats */}
      <div className="space-y-6">
        <h2 className="text-xl font-black flex items-center gap-3 text-slate-900 dark:text-white tracking-tight">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
            <BarChart3 className="text-blue-600 dark:text-blue-400 w-6 h-6" />
          </div>
          Weekly Growth
        </h2>
        <Card className="h-[300px] flex items-center justify-center border-dashed border-2 bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10 rounded-[32px] overflow-hidden relative group">
          <div className="text-center p-8 text-slate-400 space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mx-auto transition-transform group-hover:rotate-12">
              <BarChart3 className="text-slate-200 dark:text-slate-700" size={32} />
            </div>
            <p className="text-sm font-bold tracking-tight">Earnings Analytics coming soon</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Card>

        {/* Quick Insights */}
        <Card className="bg-slate-900 dark:bg-emerald-950/20 text-white border border-slate-800 dark:border-emerald-500/10 shadow-2xl rounded-[32px] overflow-hidden relative">
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
              Top Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <p className="text-3xl font-black italic tracking-tighter mb-2">Mathematics</p>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border-none">
                45% Growth
              </Badge>
              <span className="text-xs text-slate-400 font-bold tracking-tight">of total revenue</span>
            </div>
          </CardContent>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
        </Card>
      </div>
    </div>
  )
}

export default UpcomingSession