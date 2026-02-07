import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function StudentDashboardLoading() {
  return (
    <div className="p-6 lg:p-8 space-y-8 bg-white dark:bg-slate-950 min-h-screen">
      {/* 1. Hero Skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 h-[280px] rounded-3xl bg-slate-100 dark:bg-slate-900 animate-pulse p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800" />
            <Skeleton className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-11 w-36 bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Sidebar Call-to-action Skeleton */}
        <Skeleton className="h-[280px] rounded-3xl bg-rose-50/50 dark:bg-rose-950/10 border-2 border-dashed border-rose-100 dark:border-rose-900/30" />
      </div>

      {/* 2. Stats Skeleton */}
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <CardContent className="p-4 flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-lg dark:bg-slate-800" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-20 dark:bg-slate-800" />
                <Skeleton className="h-6 w-12 dark:bg-slate-800" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Table Skeleton */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="p-6 space-y-2">
          <Skeleton className="h-7 w-48 dark:bg-slate-800" />
          <Skeleton className="h-4 w-64 dark:bg-slate-800" />
        </div>
        <div className="border-t border-slate-100 dark:border-slate-800">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800/50 last:border-0">
              <div className="flex gap-4 items-center">
                <Skeleton className="h-10 w-10 rounded-full dark:bg-slate-800" />
                <Skeleton className="h-5 w-32 dark:bg-slate-800" />
              </div>
              <Skeleton className="h-5 w-24 hidden md:block dark:bg-slate-800" />
              <Skeleton className="h-5 w-20 dark:bg-slate-800" />
              <Skeleton className="h-8 w-8 rounded-md dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}