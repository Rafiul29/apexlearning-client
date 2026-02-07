import { Button } from "@/components/ui/button";
import { Category } from "@/types";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SubjectCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <section
      id="subjects"
      className="relative w-full bg-[#F6F7F9] dark:bg-[#0F172A] py-16 lg:py-24 transition-colors duration-300 "
    >
      <div className="wrapper ">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-[clamp(28px,3vw,44px)] font-bold text-[#111827] dark:text-white mb-3 lg:mb-0">
            Browse by subject
          </h2>
          <Button
            variant={"link"}
            className="flex items-center gap-2 text-[#FF6B6B] hover:text-[#ff5252] font-semibold group transition-colors"
          >
            View all
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories?.map((category: Category) => {
            return (
              <div
                key={category.id}
                className="bg-white dark:bg-[#1E293B] rounded-[22px] p-6 shadow-sm hover:shadow-[0_22px_60px_rgba(0,0,0,0.10)] dark:hover:shadow-[0_22px_60px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group border border-transparent dark:border-slate-800"
              >
                <h3 className="text-lg font-semibold text-[#111827] dark:text-white font-['Poppins'] mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-[#6B7280] dark:text-gray-400">
                  {category?.description}
                </p>

                <div className="flex justify-end mt-4">
                  <Link href={`/tutors?categoryId=${category.id}`}>
                    <div className="w-9 h-9 rounded-full bg-[#F6F7F9] dark:bg-slate-700/50 flex items-center justify-center group-hover:bg-[#FF6B6B] transition-colors">
                      <ArrowRight className="w-4 h-4 text-[#6B7280] dark:text-gray-300 group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubjectCategories;
