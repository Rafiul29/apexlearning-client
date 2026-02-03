"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingTutorProfile() {
  return (
    <main className="min-h-screen pt-20 lg:pt-28 bg-white dark:bg-slate-950 transition-colors">
      {/* Background section with subtle dark mode shift */}
      <section className="relative w-full bg-[#F6F7F9] dark:bg-slate-900/30 py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* --- LEFT SIDEBAR SKELETON --- */}
            <aside className="w-full lg:w-[400px] space-y-6 lg:sticky lg:top-32">
              <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm p-8 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-center mb-6">
                  {/* Avatar Skeleton */}
                  <Skeleton className="w-32 h-32 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>

                <div className="flex flex-col items-center space-y-3 mb-8">
                  {/* Name and Badge Skeleton */}
                  <Skeleton className="h-8 w-48 bg-slate-200 dark:bg-slate-800" />
                  <Skeleton className="h-6 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Contact Details Skeletons */}
                <div className="space-y-4 mb-8 border-t dark:border-slate-800 pt-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800" />
                    <Skeleton className="h-4 flex-1 bg-slate-200 dark:bg-slate-800" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded bg-slate-200 dark:bg-slate-800" />
                    <Skeleton className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>

                <div className="flex justify-around mb-8 py-4 border-y border-slate-100 dark:border-slate-800">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center space-y-2">
                      <Skeleton className="h-6 w-10 bg-slate-200 dark:bg-slate-800" />
                      <Skeleton className="h-3 w-8 bg-slate-200 dark:bg-slate-800" />
                    </div>
                  ))}
                </div>

                <Skeleton className="h-16 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </aside>

            {/* --- RIGHT CONTENT SKELETON --- */}
            <div className="flex-1 space-y-8 w-full">
              {/* Slot Grid Skeleton */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <Skeleton className="h-8 w-48 bg-slate-200 dark:bg-slate-800" />
                  <Skeleton className="h-6 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-2xl bg-slate-100 dark:bg-slate-800/50" />
                  ))}
                </div>
              </div>

              {/* Bio Skeleton */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                <Skeleton className="h-8 w-40 mb-6 bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full bg-slate-100 dark:bg-slate-800" />
                  <Skeleton className="h-4 w-full bg-slate-100 dark:bg-slate-800" />
                  <Skeleton className="h-4 w-2/3 bg-slate-100 dark:bg-slate-800" />
                </div>
              </div>

              {/* Experience/Education Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-36 w-full rounded-[28px] bg-slate-200 dark:bg-slate-900 border border-slate-100 dark:border-slate-800" />
                <Skeleton className="h-36 w-full rounded-[28px] bg-slate-200 dark:bg-slate-900 border border-slate-100 dark:border-slate-800" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}