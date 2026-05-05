import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const SubjectCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <section id="subjects" className="py-20 bg-white dark:bg-[#0a0a0a] font-sans">
      <div className="wrapper">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xs font-semibold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-md inline-block mb-6">
              Explore Subjects
            </h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#111827] dark:text-white tracking-tight leading-[1.1]">
              Master any skill with expert-led courses
            </h3>
          </div>
          <Button asChild variant="link" className="text-emerald-800 dark:text-emerald-400 font-extrabold hover:gap-3 transition-all text-[15px]">
            <Link href="/categories" className="flex items-center gap-2">
              View All Subjects <ArrowRight className="w-5 h-5" strokeWidth={2} />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories?.map((category: Category) => (
            <Link
              key={category.id}
              href={`/tutors?categoryId=${category.id}`}
              className="group p-8 bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 hover:-translate-y-1 transition-transform"
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
              <div className="inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubjectCategories;
