"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function StudentDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Student Dashboard UI Error:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-rose-50 p-4 rounded-full mb-6">
        <AlertCircle className="h-12 w-12 text-rose-500" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        We couldn't load your learning progress
      </h2>
      <p className="text-slate-500 max-w-sm mb-8">
        There was a problem syncing your dashboard. This usually happens due to a temporary connection issue.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={() => reset()} 
          className="bg-slate-900 h-11 px-8 font-semibold rounded-xl"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Button 
          variant="outline" 
          asChild 
          className="h-11 px-8 font-semibold rounded-xl border-slate-200"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Link>
        </Button>
      </div>

      {/* Developer Error Hint (Visible only in local development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-10 p-4 bg-slate-50 border border-slate-200 rounded-lg text-left text-xs text-rose-600 font-mono overflow-auto max-w-md">
          {error.message}
        </div>
      )}
    </div>
  );
}