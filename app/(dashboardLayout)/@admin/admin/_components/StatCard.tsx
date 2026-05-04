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
    <Card className="border-none shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-xl ${bg}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {label}
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}