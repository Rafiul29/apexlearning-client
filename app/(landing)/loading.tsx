import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function HomeLoading() {
  return (
    <div className="w-full space-y-16 pb-20">
      {/* 1. Hero Section Skeleton */}
      <section className="w-full h-[500px] bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center space-y-6 px-4">
        <Skeleton className="h-12 w-3/4 max-w-2xl bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="h-6 w-1/2 max-w-md bg-slate-200 dark:bg-slate-800" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-12 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
      </section>

      {/* 2. Featured Tutors Skeleton */}
      <section className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col items-center space-y-3">
          <Skeleton className="h-8 w-48 bg-slate-200 dark:bg-slate-800" />
          <Skeleton className="h-4 w-64 bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-sm">
              <Skeleton className="h-48 w-full bg-slate-200 dark:bg-slate-800" />
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800" />
                <Skeleton className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-4 w-16 bg-slate-100 dark:bg-slate-800" />
                  <Skeleton className="h-4 w-12 bg-slate-100 dark:bg-slate-800" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. Subject Categories Skeleton */}
      <section className="bg-white dark:bg-slate-950 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-40 bg-slate-200 dark:bg-slate-800" />
              <Skeleton className="h-4 w-60 bg-slate-100 dark:bg-slate-800" />
            </div>
            <Skeleton className="h-10 w-24 bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-20 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
