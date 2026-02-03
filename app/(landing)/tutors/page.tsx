import TutorCard from "@/components/modules/shared/tutor/TutorCard";
import SearchFilterTutor from "@/components/modules/tutorspage/SearchFilterTutor";
import TutorHeader from "@/components/modules/shared/tutor/TutorHeader";
import { categoryService } from "@/services/category.service";
import { TutorService } from "@/services/tutor.service";
import { Tutor } from "@/types";
import PaginationControls from "@/components/ui/pagination-controls";
import { Search } from "lucide-react";

const TutorsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    searchTerm: string;
    sortBy: string;
    sortOrder: string;
    limit: string;
    minPrice: string;
    maxPrice: string;
    rating: string;
    categoryId: string;
  }>;
}) => {
  const {
    page,
    searchTerm,
    sortBy,
    sortOrder,
    limit,
    minPrice,
    maxPrice,
    rating,
    categoryId,
  } = await searchParams;

  const tutors = await TutorService.getTutors(
    {
      page,
      searchTerm,
      sortBy,
      sortOrder,
      limit: "9",
      minPrice,
      maxPrice,
      rating,
      categoryId,
    },
    { revalidate: 1 },
  );

  const categories = await categoryService.getCategories(
    {},
    { revalidate: 10 },
  );

  const pagination = tutors.data?.pagination || {
    limit: 9,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  return (
    <main className="min-h-screen pt-20 lg:pt-28 bg-slate-50 dark:bg-slate-950">
      <div className="wrapper pb-20">
        <TutorHeader />
        <SearchFilterTutor searchCategories={categories.data || []} />
        {tutors.data.tutors && tutors.data.tutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.data.tutors.map((tutor: Tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 border-2 border-dashed border-border rounded-[28px]">
            <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-full mb-6">
              <Search className="w-10 h-10 text-rose-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">No tutors found</h3>
            <p className="text-muted-foreground max-w-xs mb-8">
              We couldn't find any tutors matching your current filters. Try
              adjusting your search or clearing the filters.
            </p>
          </div>
        )}
        <PaginationControls meta={pagination} isDashboard={false} />
      </div>
    </main>
  );
};

export default TutorsPage;
