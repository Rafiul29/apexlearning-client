"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, X, BookOpen, ArrowRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 1. The Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative h-10 w-10 lg:w-64 lg:justify-start rounded-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#FF6B6B] transition-all"
        >
          <Search className="h-4 w-4 lg:mr-2" />
          <span className="hidden lg:inline-flex text-xs font-medium">
            Search tutors, subjects...
          </span>
          <kbd className="pointer-events-none absolute right-3 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>

      {/* 2. The Popup Content - Positioned at Top [10%] */}
      <DialogContent className="fixed left-[50%] top-[10%] z-50 w-full max-w-[600px] translate-x-[-50%] translate-y-0 gap-0 overflow-hidden border-none bg-white p-0 shadow-2xl duration-200 rounded-[24px] dark:bg-slate-900 sm:max-w-[600px]">
        {/* --- ACCESSIBILITY SECTION --- */}
        <VisuallyHidden.Root>
          <DialogTitle>Search Tutors and Subjects</DialogTitle>
        </VisuallyHidden.Root>
        {/* ----------------------------- */}
        <div className="flex items-center border-b px-4 bg-white dark:bg-slate-900">
          <Search className="mr-3 h-5 w-5 text-slate-400" />
          <input
            className="flex h-16 w-full bg-transparent py-3 text-lg outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="What do you want to learn?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <X
              className="h-5 w-5 text-slate-400 cursor-pointer hover:text-[#FF6B6B]"
              onClick={() => setQuery("")}
            />
          )}
        </div>

        {/* 3. Quick Suggestions / Results Area */}
        <div className="p-4 max-h-[400px] overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50">
          {!query ? (
            <div className="space-y-4 p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Popular Categories
              </p>
              <div className="space-y-1">
                {[
                  "Mathematics Masterclass",
                  "IELTS Expert Prep",
                  "Fullstack Web Dev",
                ].map((item) => (
                  <button
                    key={item}
                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 group transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 group-hover:border-[#FF6B6B]/30 shadow-sm">
                        <History className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B6B]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-[#FF6B6B]">
                          {item}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Popular Subject
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#FF6B6B] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-slate-500">
              <p className="text-sm">
                Searching for{" "}
                <span className="font-bold text-[#FF6B6B]">"{query}"</span>...
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border bg-white dark:bg-slate-800 text-[10px] text-slate-500 shadow-sm font-sans">
                ↑↓
              </kbd>
              <span className="text-[10px] text-slate-400 font-medium">
                navigate
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border bg-white dark:bg-slate-800 text-[10px] text-slate-500 shadow-sm font-sans">
                enter
              </kbd>
              <span className="text-[10px] text-slate-400 font-medium">
                select
              </span>
            </div>
          </div>
          <button className="text-[11px] font-bold text-[#FF6B6B] hover:opacity-80 transition-opacity">
            Advanced Search
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
