import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, BookOpen, GraduationCap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Visual Element */}
        <div className="relative flex justify-center">
          <div className="absolute top-0 animate-pulse opacity-20 dark:opacity-10">
             <GraduationCap size={200} className="text-primary" />
          </div>
          <h1 className="text-[12rem] font-black leading-none text-slate-200 dark:text-slate-800 select-none">
            404
          </h1>
          <div className="absolute bottom-4 bg-white dark:bg-slate-950 px-6 py-2 rounded-2xl shadow-xl border">
            <p className="font-bold text-lg">Classroom not found!</p>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Looks like you're out of bounds
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            The page you are looking for might have been moved, deleted, or 
            perhaps it never existed in our curriculum.
          </p>
        </div>

        {/* Suggested Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
          <Button asChild variant="outline" className="h-24 flex-col gap-2 rounded-2xl transition-all hover:border-primary hover:bg-primary/5">
            <Link href="/">
              <Home size={20} />
              <span>Back Home</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-24 flex-col gap-2 rounded-2xl transition-all hover:border-primary hover:bg-primary/5">
            <Link href="/tutors">
              <Search size={20} />
              <span>Find Tutors</span>
            </Link>
          </Button>

          <Button asChild variant="outline" className="h-24 flex-col gap-2 rounded-2xl transition-all hover:border-primary hover:bg-primary/5">
            <Link href="/help">
              <BookOpen size={20} />
              <span>Get Help</span>
            </Link>
          </Button>
        </div>

        {/* Search Bar Alternative */}
        <div className="pt-8 border-t max-w-sm mx-auto">
            <p className="text-sm font-medium mb-4">Or try searching for a subject:</p>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input 
                    type="text" 
                    placeholder="Search math, science..." 
                    className="w-full pl-10 pr-4 py-2 rounded-full border bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
            </div>
        </div>
      </div>
    </div>
  );
}