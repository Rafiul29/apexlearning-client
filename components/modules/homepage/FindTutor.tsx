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
import { TutorService } from "@/services/tutor.service";
import { Tutor, Category } from "@/types";
import Image from "next/image";
import TutorCard from "../shared/tutor/TutorCard";
import TutorHeader from "../shared/tutor/TutorHeader";

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

    const { data, error } = await TutorService.getTutors({
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
    <section className="relative w-full bg-slate-50 dark:bg-slate-950 py-16 lg:py-24">
      <div className="wrapper container mx-auto px-4">
        {/* Header */}
        <TutorHeader />

        {/* Search & Filters */}
        <div className="bg-card dark:bg-slate-900 rounded-[22px] border border-border shadow-lg p-4 lg:p-6 mb-8">
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search subject or tutor name..."
                className="h-12 pl-11 rounded-xl bg-background"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:flex gap-3">
              {/* Sort By */}
              <Select onValueChange={setSortBy} value={sortBy}>
                <SelectTrigger className="h-12 py-6 rounded-xl bg-background lg:w-[150px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Newest</SelectItem>
                  <SelectItem value="pricePerHour">Price</SelectItem>
                  <SelectItem value="averageRating">Rating</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select onValueChange={setPriceRange} value={priceRange}>
                <SelectTrigger className="h-12 py-6 rounded-xl bg-background lg:w-[130px]">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-30">$0 - $30</SelectItem>
                  <SelectItem value="30-50">$30 - $50</SelectItem>
                  <SelectItem value="50-plus">$50+</SelectItem>
                </SelectContent>
              </Select>

              {/* Rating Filter */}
              <Select onValueChange={setRating} value={rating}>
                <SelectTrigger className="h-12 py-6 rounded-xl bg-background lg:w-[120px]">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Rating</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select onValueChange={setCategoryId} value={categoryId}>
                <SelectTrigger className="h-12 py-6 rounded-xl bg-background lg:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {searchCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                className="h-12 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-xl px-6 shadow-lg shadow-[#FF6B6B]/20"
                onClick={resetFilters}
              >
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-[28px] p-20 text-center border-2 border-dashed border-border">
              <p className="text-muted-foreground mb-4">
                No tutors found for these criteria.
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
                className="rounded-xl"
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
