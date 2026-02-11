import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tutor } from "@/types";
import { Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedTutorsProps {
  featuredTutors: Tutor[];
}

const FeaturedTutors = ({ featuredTutors }: FeaturedTutorsProps) => {
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
          {featuredTutors.map((tutor) => (
            <Link href={`/tutors/${tutor.id}`} key={tutor.id}>
              <div
                key={tutor.id}
                className="flex-shrink-0 w-full lg:w-[320px] bg-white dark:bg-[#1E293B] rounded-[28px] shadow-[0_22px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer hover:-translate-y-1.5 transition-all duration-300 border border-transparent dark:border-slate-800"
              >
                <div className="relative h-48 lg:h-52 overflow-hidden">
                  <Image
                    width={480}
                    height={320}
                    src={tutor.user?.image || "/images/default-avatar.jpg"}
                    alt={tutor.user?.name || "Tutor"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {tutor?.user?.status === "ACTIVE" && (
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-[#111827] dark:text-white border dark:border-slate-700">
                      Verified
                    </div>
                  )}
                </div>

                <div className="p-3 lg:p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tutor.subjects.map((subject: string) => (
                      <Badge
                        key={subject}
                        variant="secondary"
                        className="bg-[#F6F7F9] dark:bg-slate-700/50 text-[#6B7280] dark:text-gray-300 hover:bg-[#E9EDF3] dark:hover:bg-slate-700 text-xs font-medium rounded-full px-3 py-1 border-none text-xm"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-lg lg:text-xl font-semibold text-[#111827] dark:text-white font-['Poppins'] mb-1">
                    {tutor?.user?.name}
                  </h3>
                  <p className="text-sm text-[#6B7280] dark:text-gray-400 mb-4 line-clamp-1">
                    {tutor.bio}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                    <span className="text-lg font-semibold text-[#111827] dark:text-white">
                      ${tutor.pricePerHour}
                      <span className="text-sm font-normal text-[#6B7280] dark:text-gray-400">
                        /hr
                      </span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-[#FF6B6B] text-[#FF6B6B]" />
                      <span className="text-sm font-medium text-[#111827] dark:text-white">
                        {tutor.averageRating}
                      </span>
                      <span className="text-sm text-[#6B7280] dark:text-gray-400">
                        ({tutor.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          <div className="flex-shrink-0 w-full lg:w-[200px] flex items-center justify-center py-4">
            <Button
              asChild
              variant="link"
              className="flex items-center gap-2 text-[#FF6B6B] hover:text-[#ff5252] font-semibold group transition-colors p-0"
            >
              <Link href="/tutors">
                <span>Browse all tutors</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;
