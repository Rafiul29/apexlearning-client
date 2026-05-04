import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tutor } from "@/types";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FeaturedTutorsProps {
  featuredTutors: Tutor[];
}

const FeaturedTutors = ({ featuredTutors }: FeaturedTutorsProps) => {
  return (
    <section id="featured" className="py-20 bg-white dark:bg-[#0a0a0a] font-sans">
      <div className="wrapper">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xs font-semibold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md inline-block mb-6">
              Top Rated Tutors
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] dark:text-white leading-[1.1]">
              Learn from the best <span className="text-emerald-700 dark:text-emerald-400 italic">minds</span>
            </h3>
          </div>
          <Button asChild variant="link" className="text-emerald-800 dark:text-emerald-400 font-extrabold hover:gap-3 transition-all text-[15px]">
            <Link href="/tutors" className="flex items-center gap-2">
              Explore All Tutors <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredTutors.map((tutor) => (
            <Link
              href={`/tutors/${tutor.id}`}
              key={tutor.id}
              className="group flex flex-col bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] border border-gray-100 dark:border-white/10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:-translate-y-1 transition-transform"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[24px] h-64">
                <Image
                  fill
                  src={tutor.user?.image || "https://i.pravatar.cc/400?img=1"}
                  alt={tutor.user?.name || "Tutor"}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 dark:bg-black/50 backdrop-blur-md text-[#111827] dark:text-white border border-gray-200/50 dark:border-white/10 px-4 py-1.5 rounded-full font-bold shadow-sm">
                    ${tutor.pricePerHour}/hr
                  </Badge>
                </div>
                {tutor?.user?.status === "ACTIVE" && (
                  <div className="absolute bottom-4 right-4 bg-emerald-500 text-white p-2 rounded-full shadow-lg border border-emerald-400/50">
                    <Star className="w-4 h-4 fill-white" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-extrabold text-[#111827] dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate pr-2">
                    {tutor?.user?.name}
                  </h4>
                  <div className="flex items-center gap-1 shrink-0 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-md border border-amber-100 dark:border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" strokeWidth={1.5} />
                    <span className="text-sm font-extrabold text-amber-700 dark:text-amber-400">{tutor.averageRating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-2">
                  {tutor.subjects.slice(0, 2).map((subject: string) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 text-[10px] uppercase tracking-wider font-extrabold rounded-full px-3 py-1"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>

                <p className="text-[#4B5563] dark:text-slate-400 text-[15px] font-medium leading-[1.6] line-clamp-2 mb-2">
                  {tutor.bio}
                </p>

                <div className="pt-2 border-t border-gray-100 dark:border-white/10 flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-bold text-[#4B5563] dark:text-slate-400 uppercase tracking-widest">
                    {tutor.reviewCount} Reviews
                  </span>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white dark:group-hover:bg-emerald-600 transition-colors border border-emerald-100 dark:border-emerald-500/20">
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutors;
