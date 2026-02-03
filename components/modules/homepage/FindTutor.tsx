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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground font-['Poppins']">
            Find the right tutor
          </h2>
          <p className="text-muted-foreground">
            Search by name, subject, or bio.
          </p>
        </div>

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
                <div
                  key={tutor.id}
                  className="bg-card dark:bg-slate-900 border border-border rounded-[28px] p-6 hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        width={480}
                        height={320}
                        src={tutor?.user?.image || "/images/default-avatar.png"}
                        className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
                        alt={tutor?.user?.name || "Tutor"}
                      />
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-rose-500 transition-colors">
                          {tutor?.user?.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-rose-500 text-rose-500" />
                          <span className="text-sm font-semibold">
                            {tutor.averageRating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {tutor.categories && tutor.categories.length > 0 ? (
                        tutor.categories.map((catItem) => (
                          <Badge
                            key={catItem.category.id}
                            variant="outline"
                            className="rounded-full text-[10px] font-semibold px-2 py-0 border-rose-200 text-rose-600 dark:border-rose-900 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/30"
                          >
                            {catItem.category.name}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-[10px] text-muted-foreground">
                          No categories
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tutor.subjects.slice(0, 3).map((sub) => (
                        <Badge
                          key={sub}
                          variant="secondary"
                          className="rounded-full text-[10px] font-medium px-2 py-0"
                        >
                          {sub}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-6">
                      {tutor.bio}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xl font-bold">
                      ${tutor.pricePerHour}
                      <span className="text-xs font-normal">/hr</span>
                    </span>
                    <Button
                      size="sm"
                      className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-xl px-5 shadow-lg shadow-[#FF6B6B]/20"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
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
// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Star, MapPin, Filter, Search } from "lucide-react";

// export const tutors = [
//   {
//     id: 1,
//     name: "Priya K.",
//     avatar: "/images/tutor-priya.jpg",
//     tagline: "Math made simple",
//     subjects: ["Algebra", "Calculus"],
//     price: 45,
//     rating: 4.9,
//     totalReviews: 87,
//     totalStudents: 120,
//     bio: "I help students build confidence in math with step-by-step methods and real-world examples.",
//     isVerified: true,
//   },
//   {
//     id: 2,
//     name: "Marcus J.",
//     avatar: "/images/tutor-marcus.jpg",
//     tagline: "Speak with confidence",
//     subjects: ["English", "ESL"],
//     price: 38,
//     rating: 4.8,
//     totalReviews: 64,
//     totalStudents: 95,
//     bio: "Passionate about helping non-native speakers master English through conversation and practical exercises.",
//     isVerified: true,
//   },
//   {
//     id: 3,
//     name: "Sofia R.",
//     avatar: "/images/tutor-sofia.jpg",
//     tagline: "Code your first app",
//     subjects: ["Python", "Web Development"],
//     price: 55,
//     rating: 5.0,
//     totalReviews: 42,
//     totalStudents: 78,
//     bio: "Software engineer with 8 years of experience. I make coding accessible and fun for beginners.",
//     isVerified: true,
//   },
//   {
//     id: 4,
//     name: "James T.",
//     avatar: "/images/tutor-james.jpg",
//     tagline: "Science unlocked",
//     subjects: ["Physics", "Chemistry"],
//     price: 50,
//     rating: 4.7,
//     totalReviews: 56,
//     totalStudents: 89,
//     bio: "PhD in Physics with a passion for making complex concepts understandable for all students.",
//     isVerified: true,
//   },
// ];

// const FindTutor = () => {
//   const [showFilters, setShowFilters] = useState(false);

//   return (
//     // Updated background to use bg-slate-50 for light and dark:bg-slate-950 for dark
//     <section className="relative w-full bg-slate-50 dark:bg-slate-950 py-16 lg:py-24 transition-colors duration-300">
//       <div className="wrapper">
//         <div className="mb-8">
//           {/* text-foreground automatically handles light/dark text */}
//           <h2 className="text-3xl lg:text-[clamp(28px,3vw,44px)] font-bold text-foreground font-['Poppins'] mb-3">
//             Find the right tutor
//           </h2>
//           <p className="text-base lg:text-lg text-muted-foreground">
//             Try 'Python' or 'Spanish' to see available tutors.
//           </p>
//         </div>

//         {/* Search Bar Container: Updated bg-card and border-border */}
//         <div className="bg-card dark:bg-slate-900 rounded-[22px] border border-border shadow-lg p-4 lg:p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search subject, skill, or tutor name"
//                   className="h-12 pl-10 rounded-xl bg-background border-input"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-3">
//               <Select>
//                 <SelectTrigger className="h-12 w-[140px] rounded-xl bg-background">
//                   <SelectValue placeholder="Level" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="beginner">Beginner</SelectItem>
//                   <SelectItem value="intermediate">Intermediate</SelectItem>
//                   <SelectItem value="advanced">Advanced</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Button
//                 variant="outline"
//                 className="h-12 px-4 rounded-xl"
//                 onClick={() => setShowFilters(!showFilters)}
//               >
//                 <Filter className="w-4 h-4 mr-2" />
//                 Filters
//               </Button>
//               <Button className="h-12 bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-6 shadow-lg shadow-rose-500/20">
//                 Apply
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Tutor List */}
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="flex-1 space-y-4">
//             {tutors.map((tutor) => (
//               <div
//                 key={tutor.id}
//                 className="bg-card dark:bg-slate-900 border border-border rounded-[22px] shadow-sm hover:shadow-xl p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
//               >
//                 <div className="flex gap-4 lg:gap-6">
//                   <div className="flex-shrink-0">
//                     <img
//                       src={tutor.avatar}
//                       alt={tutor.name}
//                       className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-border"
//                     />
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 lg:gap-4">
//                       <div>
//                         <h3 className="text-lg font-semibold text-card-foreground font-['Poppins']">
//                           {tutor.name}
//                         </h3>
//                         <div className="flex flex-wrap gap-2 mt-2">
//                           {tutor.subjects.map((subject) => (
//                             <Badge
//                               key={subject}
//                               variant="secondary"
//                               className="bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
//                             >
//                               {subject}
//                             </Badge>
//                           ))}
//                         </div>
//                         <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
//                           {tutor.bio}
//                         </p>
//                         <div className="flex items-center gap-4 mt-3">
//                           <div className="flex items-center gap-1">
//                             <Star className="w-4 h-4 fill-rose-500 text-rose-500" />
//                             <span className="text-sm font-medium text-foreground">
//                               {tutor.rating}
//                             </span>
//                             <span className="text-sm text-muted-foreground">
//                               ({tutor.totalReviews} reviews)
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1 text-muted-foreground">
//                             <MapPin className="w-4 h-4" />
//                             <span className="text-sm">Online</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:gap-2">
//                         <span className="text-xl font-semibold text-foreground">
//                           ${tutor.price}
//                           <span className="text-sm font-normal text-muted-foreground">
//                             /hr
//                           </span>
//                         </span>
//                         <Button
//                           variant="outline"
//                           className="rounded-xl border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white"
//                         >
//                           View profile
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FindTutor;
