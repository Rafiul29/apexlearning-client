import { BookOpen, Clock, Star, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StudentStats({ stats }: { stats: any }) {
    const items = [
        { label: "Total Lessons", value: stats.totalLessons, icon: BookOpen, color: "text-blue-600" },
        { label: "Hours Learned", value: stats.hoursLearned, icon: Clock, color: "text-purple-600" },
        { label: "Avg. Rating", value: stats.avgRatingGiven, icon: Star, color: "text-amber-500" }
    ];

    return (
        <div className="grid gap-3 md:grid-cols-3">
            {items.map((item) => (
                <Card key={item.label} className="border-slate-100 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                            <item.icon size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{item.label}</p>
                            <p className="text-xl font-bold text-slate-900">{item.value}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}