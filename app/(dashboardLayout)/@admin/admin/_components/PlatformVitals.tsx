import { Activity, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function HealthIndicator({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-900">{value}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div 
            className={`h-full rounded-full transition-all duration-700 ease-out ${color}`} 
            style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}

export function PlatformVitals() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-900 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-rose-400" /> Platform Vitals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <HealthIndicator label="Booking Success Rate" value={98} color="bg-emerald-500" />
        <HealthIndicator label="API Availability" value={99.9} color="bg-blue-500" />
        <HealthIndicator label="Avg. Support Ticket" value={82} color="bg-amber-500" />
        
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
            <div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase">Current Liquidity</p>
              <p className="text-xl font-black text-emerald-900">$12,400.00</p>
            </div>
            <div className="p-2 bg-white rounded-full shadow-sm">
              <ArrowUpRight className="text-emerald-600" size={24} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}