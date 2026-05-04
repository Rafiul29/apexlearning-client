"use client";

import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Filter, Search, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tutor, Category } from "@/types";
import Image from "next/image";
import TutorCard from "../shared/tutor/TutorCard";
import TutorHeader from "../shared/tutor/TutorHeader";
import { getTutorsAction } from "@/actions/tutors";

const FindTutor = ({ searchCategories }: { searchCategories: Category[] }) => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [sortBy, setSortBy] = useState("createdAt");
  const [priceRange, setPriceRange] = useState("all");
  const [rating, setRating] = useState("all");
  const [categoryId, setCategoryId] = useState("all");

  const loadTutors = useCallback(async () => {
    setIsLoading(true);

    let minPrice = undefined;
    let maxPrice = undefined;
    if (priceRange !== "all") {
      const parts = priceRange.split("-");
      minPrice = parts[0];
      maxPrice = parts[1] === "plus" ? undefined : parts[1];
    }

    const { data, error } = await getTutorsAction({
      searchTerm: debouncedSearch || undefined,
      sortBy,
      sortOrder: "desc",
      limit: "6",
      minPrice,
      maxPrice,
      rating: rating !== "all" ? rating : undefined,
      categoryId: categoryId !== "all" ? categoryId : undefined,
    });

    if (!error && data) {
      setTutors(data.tutors || []);
    } else {
      setTutors([]);
    }
    setIsLoading(false);
  }, [debouncedSearch, sortBy, priceRange, rating, categoryId]);

  useEffect(() => {
    loadTutors();
  }, [loadTutors]);

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange("all");
    setRating("all");
    setCategoryId("all");
    setSortBy("createdAt");
  };

  return (
    <section className="relative w-full bg-[#fafafa] dark:bg-[#050505] py-20 font-sans">
      <div className="wrapper container mx-auto px-4">
        {/* Header */}
        <TutorHeader />

        {/* Search & Filters */}
        <div className="bg-white dark:bg-white/[0.02] backdrop-blur-xl rounded-[24px] sm:rounded-[32px] shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-slate-200/60 dark:border-white/10 p-5 sm:p-6 lg:p-8 mb-8 sm:mb-12 transition-all">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 transition-colors" />
              <Input
                placeholder="Search subject or tutor name..."
                className="h-12 sm:h-14 pl-11 sm:pl-14 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500/30 text-slate-900 dark:text-slate-100 text-sm sm:text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm transition-all w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap lg:flex-nowrap gap-3 sm:gap-4">
              {/* Sort By */}
              <Select onValueChange={setSortBy} value={sortBy}>
                <SelectTrigger className="h-12 sm:h-14 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 sm:min-w-[140px] font-medium text-slate-700 dark:text-slate-200 text-xs sm:text-sm md:text-base shadow-sm hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/5 transition-all">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 dark:border-white/10 shadow-lg">
                  <SelectItem value="createdAt" className="rounded-xl cursor-pointer">Newest</SelectItem>
                  <SelectItem value="pricePerHour" className="rounded-xl cursor-pointer">Price</SelectItem>
                  <SelectItem value="averageRating" className="rounded-xl cursor-pointer">Rating</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select onValueChange={setPriceRange} value={priceRange}>
                <SelectTrigger className="h-12 sm:h-14 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 sm:min-w-[130px] font-medium text-slate-700 dark:text-slate-200 text-xs sm:text-sm md:text-base shadow-sm hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/5 transition-all">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 dark:border-white/10 shadow-lg">
                  <SelectItem value="all" className="rounded-xl cursor-pointer">Any Price</SelectItem>
                  <SelectItem value="0-30" className="rounded-xl cursor-pointer">$0 - $30</SelectItem>
                  <SelectItem value="30-50" className="rounded-xl cursor-pointer">$30 - $50</SelectItem>
                  <SelectItem value="50-plus" className="rounded-xl cursor-pointer">$50+</SelectItem>
                </SelectContent>
              </Select>

              {/* Rating Filter */}
              <Select onValueChange={setRating} value={rating}>
                <SelectTrigger className="h-12 sm:h-14 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 sm:min-w-[130px] font-medium text-slate-700 dark:text-slate-200 text-xs sm:text-sm md:text-base shadow-sm hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/5 transition-all">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 dark:border-white/10 shadow-lg">
                  <SelectItem value="all" className="rounded-xl cursor-pointer">Any Rating</SelectItem>
                  <SelectItem value="3" className="rounded-xl cursor-pointer">3+ Stars</SelectItem>
                  <SelectItem value="4" className="rounded-xl cursor-pointer">4+ Stars</SelectItem>
                  <SelectItem value="4.5" className="rounded-xl cursor-pointer">4.5+ Stars</SelectItem>
                  <SelectItem value="5" className="rounded-xl cursor-pointer">5 Stars</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select onValueChange={setCategoryId} value={categoryId}>
                <SelectTrigger className="h-12 sm:h-14 rounded-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 sm:min-w-[160px] font-medium text-slate-700 dark:text-slate-200 text-xs sm:text-sm md:text-base shadow-sm hover:border-emerald-500/30 hover:bg-white dark:hover:bg-white/5 transition-all">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 dark:border-white/10 shadow-lg">
                  <SelectItem value="all" className="rounded-xl cursor-pointer">All Categories</SelectItem>
                  {searchCategories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id} className="rounded-xl cursor-pointer">
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="h-12 sm:h-14 col-span-2 sm:col-span-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-transparent hover:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 rounded-full px-6 font-medium shadow-sm transition-all text-xs sm:text-sm md:text-base w-full sm:w-auto"
                onClick={resetFilters}
              >
                <Filter className="w-4 h-4 mr-2 hidden sm:inline-block" />
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-rose-500 mb-4" />
              <p className="text-muted-foreground">Finding best tutors...</p>
            </div>
          ) : tutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutors?.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] p-20 text-center border border-gray-200 border-dashed dark:border-white/20">
              <p className="text-[#4B5563] dark:text-slate-400 font-medium mb-6">
                No tutors found for these criteria.
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
                className="rounded-full border-gray-200 dark:border-white/20 font-bold hover:bg-gray-50 dark:hover:bg-white/5"
              >
                Reset Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FindTutor;
