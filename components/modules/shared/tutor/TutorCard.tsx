import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tutor } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TutorCard = ({ tutor }: { tutor: Tutor }) => {
  return (
    <div
      key={tutor.id}
      className="bg-white dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:-translate-y-1 transition-transform duration-300 group flex flex-col justify-between font-sans"
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Image
            width={480}
            height={320}
            src={tutor?.user?.image || "/images/default-avatar.jpg"}
            className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-white/10 shadow-sm"
            alt={tutor?.user?.name || "Tutor"}
          />
          <div>
            <h3 className="font-extrabold text-[#111827] dark:text-white text-lg group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {tutor?.user?.name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-[#4B5563] dark:text-slate-300">
                {tutor.averageRating}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {tutor.categories && tutor.categories.length > 0 ? (
            tutor.categories.slice(0, 3).map((catItem) => (
              <Badge
                key={catItem.category.id}
                variant="outline"
                className="rounded-full text-[10px] font-extrabold px-3 py-0.5 border-emerald-200 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 tracking-wide uppercase"
              >
                {catItem.category.name}
              </Badge>
            ))
          ) : (
            <span className="text-[10px] text-[#4B5563] dark:text-slate-400 font-medium">
              No categories
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tutor.subjects.slice(0, 3).map((sub) => (
            <Badge
              key={sub}
              variant="secondary"
              className="rounded-full text-[10px] font-bold px-3 py-0.5 bg-gray-100 dark:bg-white/10 text-[#4B5563] dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors border-transparent"
            >
              {sub}
            </Badge>
          ))}
        </div>
        <p className="text-[14px] text-[#4B5563] dark:text-slate-400 font-medium leading-[1.6] line-clamp-3 mb-6">
          {tutor.bio}
        </p>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-white/10">
        <span className="text-xl font-extrabold text-[#111827] dark:text-white">
          ${tutor.pricePerHour}
          <span className="text-[13px] font-medium text-[#4B5563] dark:text-slate-400">/hr</span>
        </span>
        <Button
          variant={"link"}
          size="sm"
          className="bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-full px-5 h-9 font-bold shadow-sm transition-all no-underline hover:no-underline"
        >
          <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default TutorCard;
