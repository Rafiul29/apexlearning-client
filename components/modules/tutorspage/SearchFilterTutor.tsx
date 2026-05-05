"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types";
import { Button } from "@/components/ui/button";

const SearchFilterTutor = ({
  searchCategories,
}: {
  searchCategories: Category[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for the input to keep it responsive, but URL for the rest
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  // Function to update URL params
  const updateFilters = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Effect to sync debounced search with URL
  useEffect(() => {
    updateFilters("searchTerm", debouncedSearch);
  }, [debouncedSearch]);

  const resetFilters = () => {
    setSearchTerm("");
    router.push("/tutors"); // Clears all params
  };

  return (
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
          <Select
            value={searchParams.get("sortBy") || "createdAt"}
            onValueChange={(val) => updateFilters("sortBy", val)}
          >
            <SelectTrigger className="h-12 py-6 px-6 rounded-xl bg-background lg:w-[150px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="max-h-[300px] w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-xl border-border shadow-2xl">
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="pricePerHour">Price</SelectItem>
              <SelectItem value="averageRating">Rating</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range */}
          <Select
            value={searchParams.get("priceRange") || "all"}
            onValueChange={(val) => {
              const params = new URLSearchParams(searchParams.toString());
              if (val === "all") {
                params.delete("minPrice");
                params.delete("maxPrice");
              } else {
                const [min, max] = val.split("-");
                params.set("minPrice", min);
                max === "plus"
                  ? params.delete("maxPrice")
                  : params.set("maxPrice", max);
              }
              params.set("priceRange", val); // Helper for UI state
              router.push(`?${params.toString()}`, { scroll: false });
            }}
          >
            <SelectTrigger className="h-12 py-6 px-6 rounded-xl bg-background lg:w-[130px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="max-h-[300px] w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-xl border-border shadow-2xl">
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="0-30">$0 - $30</SelectItem>
              <SelectItem value="30-50">$30 - $50</SelectItem>
              <SelectItem value="50-plus">$50+</SelectItem>
            </SelectContent>
          </Select>

          {/* Rating */}
          <Select
            value={searchParams.get("rating") || "all"}
            onValueChange={(val) => updateFilters("rating", val)}
          >
            <SelectTrigger className="h-12 py-6 px-6 rounded-xl bg-background lg:w-[120px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="max-h-[300px] w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-xl border-border shadow-2xl">
              <SelectItem value="all">Any Rating</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
            </SelectContent>
          </Select>

          {/* Category */}
          <Select
            value={searchParams.get("categoryId") || "all"}
            onValueChange={(val) => updateFilters("categoryId", val)}
          >
            <SelectTrigger className="h-12 py-6 px-6 rounded-xl bg-background lg:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="max-h-[300px] w-[var(--radix-select-trigger-width)] overflow-y-auto rounded-xl border-border shadow-2xl">
              <SelectItem value="all">All Categories</SelectItem>
              {searchCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="h-12 py-6 px-6 bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-xl"
            onClick={resetFilters}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterTutor;
