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
      className="bg-card dark:bg-slate-900 border border-border rounded-[28px] p-6 hover:shadow-xl transition-all group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Image
            width={480}
            height={320}
            src={tutor?.user?.image || "/images/default-avatar.jpg"}
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
          variant={"link"}
          size="sm"
          className="bg-[#FF6B6B] hover:bg-[#ff5252] text-white rounded-xl px-5 shadow-lg shadow-[#FF6B6B]/20"
        >
          <Link href={`/tutors/${tutor.id}`}>View Profile </Link>
        </Button>
      </div>
    </div>
  );
};

export default TutorCard;
