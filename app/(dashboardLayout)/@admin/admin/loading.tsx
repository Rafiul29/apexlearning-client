import { StatCardSkeleton } from "@/components/layout/StatCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";


export default function AdminDashboardLoading() {
    return (
        <div className="p-6 lg:p-10 space-y-8 bg-slate-50/50 min-h-screen">
            {/* Header Loading State */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-80" />
                </div>
                <div className="flex gap-3">
                    <Skeleton className="h-10 w-28 rounded-md" />
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>
            </div>

            {/* Stats Grid Loading State */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>

            {/* Main Content Loading State */}
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-[500px] w-full rounded-2xl" />
                </div>
            </div>
        </div>
    );
}