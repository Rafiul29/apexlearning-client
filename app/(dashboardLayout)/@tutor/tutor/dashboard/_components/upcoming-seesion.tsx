import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, CalendarCheck, ChevronRight } from 'lucide-react'
import React from 'react'

const UpcomingSession = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Upcoming Sessions (Left Column) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CalendarCheck className="text-rose-600" /> Upcoming Sessions
          </h2>
          {[1, 2, 3].map((session) => (
            <Card
              key={session}
              className="group hover:border-rose-200 transition-all cursor-pointer"
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-rose-100 text-rose-700 p-3 rounded-lg text-center min-w-[60px]">
                  <span className="block text-xs font-bold uppercase">Feb</span>
                  <span className="text-xl font-bold">0{session + 4}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    Advanced Calculus
                  </h4>
                  <p className="text-sm text-slate-500">
                    Student: Sarah Jenkins
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">10:30 AM - 11:30 AM</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                    Confirmed
                  </span>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight size={18} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 4. Statistics & Performance (Right Column) */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="text-blue-600" /> Weekly Growth
          </h2>
          <Card className="h-[300px] flex items-center justify-center border-dashed border-2">
            {/* You can drop a Recharts bar chart here */}
            <div className="text-center p-6 text-slate-400">
              [Chart Placeholder: Earnings over last 7 days]
            </div>
          </Card>

          {/* Quick Insights */}
          <Card className="bg-slate-900 text-white border-none">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Top Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Mathematics</p>
              <p className="text-xs text-slate-400 mt-1">
                45% of your total revenue
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default UpcomingSession