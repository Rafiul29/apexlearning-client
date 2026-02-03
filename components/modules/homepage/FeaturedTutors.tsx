import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ChevronRight } from "lucide-react";
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

const FeaturedTutors = () => {
  return (
    <section
      id="featured"
      className="relative w-full py-16 lg:py-24 bg-[#F6F7F9] dark:bg-[#0F172A] transition-colors duration-300"
    >
      <div className=" wrapper">
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-[clamp(28px,3vw,44px)] font-bold text-[#111827] dark:text-white font-['Poppins'] mb-3">
            Featured tutors
          </h2>
          <p className="text-base lg:text-lg text-[#6B7280] dark:text-gray-400 max-w-xl">
            Handpicked for clear explanations, great reviews, and quick replies.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6  pb-8 -mx-6 px-6 lg:mx-0 lg:px-0">
          {tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="flex-shrink-0 w-full lg:w-[320px] bg-white dark:bg-[#1E293B] rounded-[28px] shadow-[0_22px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer hover:-translate-y-1.5 transition-all duration-300 border border-transparent dark:border-slate-800"
            >
              <div className="relative h-48 lg:h-52 overflow-hidden">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {tutor.isVerified && (
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-[#111827] dark:text-white border dark:border-slate-700">
                    Verified
                  </div>
                )}
              </div>

              <div className="p-5 lg:p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {tutor.subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="bg-[#F6F7F9] dark:bg-slate-700/50 text-[#6B7280] dark:text-gray-300 hover:bg-[#E9EDF3] dark:hover:bg-slate-700 text-xs font-medium rounded-full px-3 py-1 border-none"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-lg lg:text-xl font-semibold text-[#111827] dark:text-white font-['Poppins'] mb-1">
                  {tutor.name}
                </h3>
                <p className="text-sm text-[#6B7280] dark:text-gray-400 mb-4 line-clamp-1">
                  {tutor.tagline}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                  <span className="text-lg font-semibold text-[#111827] dark:text-white">
                    ${tutor.price}
                    <span className="text-sm font-normal text-[#6B7280] dark:text-gray-400">
                      /hr
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-[#FF6B6B] text-[#FF6B6B]" />
                    <span className="text-sm font-medium text-[#111827] dark:text-white">
                      {tutor.rating}
                    </span>
                    <span className="text-sm text-[#6B7280] dark:text-gray-400">
                      ({tutor.totalReviews})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex-shrink-0 w-full lg:w-[200px] flex items-center justify-center py-4">
            <Button variant={"link"} className="flex items-center gap-2 text-[#FF6B6B] hover:text-[#ff5252] font-semibold group transition-colors">
              Browse all tutors
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;
