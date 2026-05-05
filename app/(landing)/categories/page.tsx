import { categoryService } from "@/services/category.service";
import { Category } from "@/types";
import {
  Shapes,
  BookOpen,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const CategoriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    limit: string;
    search: string;
  }>;
}) => {
  const { search } = await searchParams;

  const categories = await categoryService.getCategories({
    limit: "100"
  });

  console.log(categories?.data);


  return (
    <main className="min-h-screen pt-24 lg:pt-32 bg-white dark:bg-[#0a0a0a] animate-in fade-in duration-700">
      <div className="wrapper pb-32 space-y-16">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest animate-bounce">
            <Shapes className="w-4 h-4" />
            Discover Your Path
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
            Explore All <span className="text-emerald-600">Learning</span> Streams
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Choose from a wide range of specialized subjects taught by expert tutors.
            Find the perfect category to accelerate your learning journey today.
          </p>
        </div>

        {categories?.data && categories.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.data.map((category: Category) => (
              <Link
                key={category.id}
                href={`/tutors?categoryId=${category.id}`}
                className="group p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                  <BookOpen className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-extrabold mb-3 text-[#111827] dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h4>
                <p className="text-[#4B5563] dark:text-slate-400 text-[15px] font-medium leading-[1.6] line-clamp-2 mb-6">
                  {category?.description || "Explore our wide range of expert-led courses in this subject category."}
                </p>
                <div className="inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all">
                  Explore <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-[48px] shadow-inner">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl inline-block shadow-sm mb-6">
              <BookOpen className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">No Categories Found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              We couldn't find any categories matching your criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoriesPage;
