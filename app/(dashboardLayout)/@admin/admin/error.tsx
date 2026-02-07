"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Dashboard Error:", error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="h-20 w-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="h-10 w-10 text-rose-600" />
            </div>

            <h1 className="text-3xl font-black text-slate-900 mb-2">
                Something went wrong
            </h1>
            <p className="text-slate-500 max-w-md mb-8 font-medium">
                We encountered an error while loading your dashboard data. This might be a temporary connection issue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center">
                <Button
                    onClick={() => reset()}
                    className="bg-slate-900 hover:bg-slate-800 h-11 px-8 font-bold rounded-xl"
                >
                    <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                </Button>

                <Button
                    variant="outline"
                    asChild
                    className="h-11 px-8 font-bold rounded-xl border-slate-200"
                >
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" /> Back to Home
                    </Link>
                </Button>
            </div>

            {process.env.NODE_ENV === "development" && (
                <pre className="mt-10 p-4 bg-slate-100 rounded-lg text-left text-xs overflow-auto max-w-2xl text-rose-700 border border-rose-100">
                    {error.message}
                </pre>
            )}
        </div>
    );
}