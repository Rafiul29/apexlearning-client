"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function TutorDashboardLoading() {
  return (
    <div className="p-6 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* 1. Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-3">
          {/* Welcome Title */}
          <Skeleton className="h-10 w-64 bg-slate-200 dark:bg-slate-800" />
          {/* Subtitle */}
          <Skeleton className="h-4 w-80 max-w-[90%] bg-slate-200 dark:bg-slate-800" />
        </div>
        {/* Action Button */}
        <Skeleton className="h-10 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* 2. Stats Bento Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="border-none shadow-sm bg-white dark:bg-slate-900"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-24 bg-slate-100 dark:bg-slate-800" />
                <Skeleton className="h-8 w-16 bg-slate-200 dark:bg-slate-700" />
              </div>
              <Skeleton className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-6 w-48 bg-slate-200 dark:bg-slate-800" />
          </div>
          {[...Array(3)].map((_, i) => (
            <Card
              key={i}
              className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
            >
              <CardContent className="p-4 flex items-center gap-4">
                {/* Date block */}
                <Skeleton className="h-14 w-14 rounded-2xl flex-shrink-0 bg-slate-200 dark:bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/2 bg-slate-200 dark:bg-slate-800" />
                  <Skeleton className="h-4 w-1/3 bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="hidden sm:flex space-y-2 flex-col items-end">
                  <Skeleton className="h-4 w-24 bg-slate-100 dark:bg-slate-800" />
                  <Skeleton className="h-6 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-40 bg-slate-200 dark:bg-slate-800" />
            <Card className="h-[300px] border-dashed border-2 border-slate-200 dark:border-slate-800 bg-transparent">
              <CardContent className="h-full p-0">
                <Skeleton className="h-full w-full rounded-xl bg-slate-100/50 dark:bg-slate-800/20" />
              </CardContent>
            </Card>
          </div>

          {/* Quick Insights Card - Specifically adjusted for dark contrast */}
          <Card className="bg-slate-900 dark:bg-emerald-950 border-none">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-4 w-20 bg-slate-700 dark:bg-emerald-800" />
              <Skeleton className="h-9 w-32 bg-slate-700 dark:bg-emerald-800" />
              <Skeleton className="h-3 w-full bg-slate-700 dark:bg-emerald-800" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
