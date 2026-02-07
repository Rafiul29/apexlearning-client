import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, CalendarCheck, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

const UpcomingSession = ({ sessions = [] }: { sessions: any[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
          <CalendarCheck className="text-rose-600" /> Upcoming Sessions
        </h2>

        {sessions.length > 0 ? (
          sessions.map((session) => {
            const dateObj = new Date(session.slotDate);
            const month = dateObj.toLocaleString("en-US", { month: "short" });
            const day = dateObj.getDate().toString().padStart(2, '0');

            return (
              <Card
                key={session.id}
                className="group hover:border-rose-200 transition-all cursor-pointer shadow-sm border-slate-200"
              >
                <CardContent className="p-4 flex items-center gap-4">
                  {/* Dynamic Date Block */}
                  <div className="bg-rose-50 text-rose-700 p-3 rounded-xl text-center min-w-[65px] group-hover:bg-rose-100 transition-colors">
                    <span className="block text-[10px] font-black uppercase tracking-wider">
                      {month}
                    </span>
                    <span className="text-2xl font-black leading-none">
                      {day}
                    </span>
                  </div>

                  {/* Session Details */}
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {session.category?.name || "Private Tutoring"}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">
                      Student: {session.student?.user?.name || "Valued Student"}
                    </p>
                  </div>

                  {/* Time & Status */}
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {session.startTime} - {session.endTime}
                    </p>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight",
                      session.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {session.status}
                    </span>
                  </div>

                  <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-rose-600">
                    <ChevronRight size={18} />
                  </Button>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="border-dashed border-2 bg-slate-50/50">
            <CardContent className="p-10 text-center text-slate-400">
              No upcoming sessions found for this week.
            </CardContent>
          </Card>
        )}
      </div>

      {/* 4. Statistics & Performance (Right Column) */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
          <BarChart3 className="text-blue-600" /> Weekly Growth
        </h2>
        <Card className="h-[280px] flex items-center justify-center border-dashed border-2 bg-white">
          <div className="text-center p-6 text-slate-400 space-y-2">
            <div className="h-2 w-24 bg-slate-100 rounded-full mx-auto" />
            <p className="text-sm font-medium">Earnings Analytics coming soon</p>
          </div>
        </Card>

        {/* Quick Insights */}
        <Card className="bg-slate-900 text-white border-none shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Top Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-black italic">Mathematics</p>
            <p className="text-xs text-rose-400 font-bold mt-1 uppercase tracking-wider">
              45% of total revenue
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UpcomingSession