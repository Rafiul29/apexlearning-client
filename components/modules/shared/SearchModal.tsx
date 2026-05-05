"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  X,
  ArrowRight,
  Loader2,
  User,
  BookOpen,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { TutorService } from "@/services/tutor.service";
import { Tutor, Category } from "@/types";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getCategoriesAction } from "@/actions/categories";
import { getTutorsAction } from "@/actions/tutors";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [results, setResults] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const router = useRouter();
  const [debouncedQuery] = useDebounce(query, 400);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data, error } = await getCategoriesAction(
          { limit: "5" },
          { revalidate: 3600 },
        );
        if (!error && data) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    fetchInitialData();
  }, []);

  const fetchResults = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await getTutorsAction({
        searchTerm,
        limit: "5",
      });
      if (!error && data) setResults(data.tutors || []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResults(debouncedQuery);
    setSelectedIndex(-1);
  }, [debouncedQuery, fetchResults]);

  // 3. Unified Keyboard Handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const listLength = query ? results.length : categories.length;
    if (listLength === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < listLength - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      if (query) {
        router.push(`/tutors/${results[selectedIndex].id}`);
      } else {
        router.push(`/tutors?categoryId=${categories[selectedIndex].id}`);
      }
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative h-10 w-10 lg:w-64 lg:justify-start rounded-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 transition-all cursor-pointer"
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

      <DialogContent
        onKeyDown={handleKeyDown}
        className="fixed left-[50%] top-[10%] z-50 w-[95vw] sm:w-full sm:max-w-[600px] translate-x-[-50%] translate-y-0 gap-0 overflow-hidden border-none bg-white p-0 shadow-2xl rounded-[24px] dark:bg-slate-900 [&>button]:hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <VisuallyHidden.Root>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden.Root>

        {/* Input Field */}
        <div className="flex items-center border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 bg-white dark:bg-slate-900">
          <Search className="mr-3 h-5 w-5 text-slate-400 dark:text-slate-500" />
          <input
            className="flex h-14 sm:h-16 w-full bg-transparent py-3 text-base sm:text-lg outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            placeholder="Search by name, subject, or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-slate-400 dark:text-slate-500" />
            </button>
          )}
        </div>

        {/* Scrollable Area */}
        <div className="relative min-h-[350px] max-h-[500px] overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50 p-4">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-slate-900/60 z-20 rounded-b-[24px]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}

          {/* SECTION: CATEGORIES (Initial View) */}
          {!query && categories.length > 0 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 px-2">
                <Layers className="w-3 h-3 text-slate-400" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Explore Categories
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((cat, index) => (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      router.push(`/tutors?categoryId=${cat.id}`);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl transition-all border border-transparent text-left group",
                      selectedIndex === index
                        ? "bg-white dark:bg-slate-800 shadow-md border-slate-100 dark:border-slate-700"
                        : "hover:bg-white/40",
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={cn(
                          "p-2.5 rounded-xl transition-colors shrink-0",
                          selectedIndex === index
                            ? "text-white"
                            : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
                        )}
                      >
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                        {cat.name}
                      </span>
                    </div>
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 text-emerald-500 dark:text-emerald-400 transition-all shrink-0 ml-2",
                        selectedIndex === index
                          ? "opacity-100 translate-x-1"
                          : "opacity-0",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: SEARCH RESULTS */}
          {query && results.length > 0 && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Top Tutor Matches
              </p>
              {results.map((tutor, index) => (
                <button
                  key={tutor.id}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    router.push(`/tutors/${tutor.id}`);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-2xl transition-all border border-transparent text-left",
                    selectedIndex === index
                      ? "bg-white dark:bg-slate-800 shadow-md border-slate-100 dark:border-slate-700"
                      : "hover:bg-white/40",
                  )}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-100 shrink-0">
                      {tutor.user?.image ? (
                        <img
                          src={tutor.user.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100">
                          <User className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-bold transition-colors truncate",
                          selectedIndex === index
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-slate-700 dark:text-slate-200",
                        )}
                      >
                        {tutor.user?.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {tutor.bio}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      ${tutor.pricePerHour}/hr
                    </p>
                    {tutor.averageRating > 0 && (
                      <p className="text-[10px] text-amber-500 font-medium">
                        ★ {tutor.averageRating.toFixed(1)}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results state */}
          {query && results.length === 0 && !isLoading && (
            <div className="py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-white/5 mb-4">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No matches found for{" "}
                <span className="font-bold text-slate-900 dark:text-slate-200">"{query}"</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Try searching for a different subject or name</p>
            </div>
          )}
        </div>

        {/* Footer with Hotkeys */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <kbd className="px-1.5 py-0.5 rounded border bg-white dark:bg-slate-800 shadow-sm font-sans">
                ↑↓
              </kbd>{" "}
              navigate
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <kbd className="px-1.5 py-0.5 rounded border bg-white dark:bg-slate-800 shadow-sm font-sans">
                enter
              </kbd>{" "}
              select
            </span>
          </div>
          <Button
            variant={"link"}
            onClick={() => {
              router.push("/tutors");
              setOpen(false);
            }}
            className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter hover:opacity-70 transition-opacity"
          >
            Advanced Filter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
