"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, MapPin, Filter, Search } from "lucide-react";

export const tutors = [
  {
    id: 1,
    name: "Priya K.",
    avatar: "/images/tutor-priya.jpg",
    tagline: "Math made simple",
    subjects: ["Algebra", "Calculus"],
    price: 45,
    rating: 4.9,
    totalReviews: 87,
    totalStudents: 120,
    bio: "I help students build confidence in math with step-by-step methods and real-world examples.",
    isVerified: true,
  },
  {
    id: 2,
    name: "Marcus J.",
    avatar: "/images/tutor-marcus.jpg",
    tagline: "Speak with confidence",
    subjects: ["English", "ESL"],
    price: 38,
    rating: 4.8,
    totalReviews: 64,
    totalStudents: 95,
    bio: "Passionate about helping non-native speakers master English through conversation and practical exercises.",
    isVerified: true,
  },
  {
    id: 3,
    name: "Sofia R.",
    avatar: "/images/tutor-sofia.jpg",
    tagline: "Code your first app",
    subjects: ["Python", "Web Development"],
    price: 55,
    rating: 5.0,
    totalReviews: 42,
    totalStudents: 78,
    bio: "Software engineer with 8 years of experience. I make coding accessible and fun for beginners.",
    isVerified: true,
  },
  {
    id: 4,
    name: "James T.",
    avatar: "/images/tutor-james.jpg",
    tagline: "Science unlocked",
    subjects: ["Physics", "Chemistry"],
    price: 50,
    rating: 4.7,
    totalReviews: 56,
    totalStudents: 89,
    bio: "PhD in Physics with a passion for making complex concepts understandable for all students.",
    isVerified: true,
  },
];

const FindTutor = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    // Updated background to use bg-slate-50 for light and dark:bg-slate-950 for dark
    <section className="relative w-full bg-slate-50 dark:bg-slate-950 py-16 lg:py-24 transition-colors duration-300">
      <div className="px-6 lg:px-[7vw]">
        <div className="mb-8">
          {/* text-foreground automatically handles light/dark text */}
          <h2 className="text-3xl lg:text-[clamp(28px,3vw,44px)] font-bold text-foreground font-['Poppins'] mb-3">
            Find the right tutor
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground">
            Try 'Python' or 'Spanish' to see available tutors.
          </p>
        </div>

        {/* Search Bar Container: Updated bg-card and border-border */}
        <div className="bg-card dark:bg-slate-900 rounded-[22px] border border-border shadow-lg p-4 lg:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search subject, skill, or tutor name"
                  className="h-12 pl-10 rounded-xl bg-background border-input"
                />
              </div>
            </div>
            <div className="flex gap-3">
              {/* <Select>
                <SelectTrigger className="h-12 w-[140px] rounded-xl bg-background">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select> */}

              <Button
                variant="outline"
                className="h-12 px-4 rounded-xl"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button className="h-12 bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-6 shadow-lg shadow-rose-500/20">
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Tutor List */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {tutors.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-card dark:bg-slate-900 border border-border rounded-[22px] shadow-sm hover:shadow-xl p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex gap-4 lg:gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-border"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 lg:gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-card-foreground font-['Poppins']">
                          {tutor.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tutor.subjects.map((subject) => (
                            <Badge
                              key={subject}
                              variant="secondary"
                              className="bg-secondary text-secondary-foreground text-xs font-medium rounded-full"
                            >
                              {subject}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {tutor.bio}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-rose-500 text-rose-500" />
                            <span className="text-sm font-medium text-foreground">
                              {tutor.rating}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({tutor.totalReviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">Online</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:gap-2">
                        <span className="text-xl font-semibold text-foreground">
                          ${tutor.price}
                          <span className="text-sm font-normal text-muted-foreground">
                            /hr
                          </span>
                        </span>
                        <Button
                          variant="outline"
                          className="rounded-xl border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white"
                        >
                          View profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindTutor;
