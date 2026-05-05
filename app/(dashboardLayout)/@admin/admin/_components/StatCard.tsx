// components/admin/StatCard.tsx
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export function StatCard({ label, value, icon: Icon, color, bg }: StatCardProps) {
  return (
    <Card className="border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5 shadow-sm rounded-3xl transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={cn("p-3 rounded-2xl", bg)}>
            <Icon className={cn("h-6 w-6", color)} />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {label}
          </p>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}