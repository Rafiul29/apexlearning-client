import { BookOpen, Clock, Star, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StudentStats({ stats }: { stats: any }) {
    const items = [
        { label: "Total Lessons", value: stats.totalLessons, icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Hours Learned", value: stats.hoursLearned, icon: Clock, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Avg. Rating", value: stats.avgRatingGiven, icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {items.map((item) => (
                <Card key={item.label} className="border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] rounded-[24px] shadow-sm transition-all hover:shadow-md">
                    <CardContent className="p-6 flex items-center gap-5">
                        <div className={cn("p-4 rounded-2xl", item.bg, item.color)}>
                            <item.icon size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{item.value}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}