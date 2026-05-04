import { CategoryActions } from "@/app/(dashboardLayout)/@admin/admin/_components/category/CategoryActions";
import { CategoryTable } from "@/app/(dashboardLayout)/@admin/admin/_components/category/CategoryTable";
import { categoryService } from "@/services/category.service";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const { data, error } = await categoryService.getCategories();

  return (
    <div className="p-8 space-y-8 font-sans">
      <div className="flex justify-between items-center bg-white dark:bg-white/5 backdrop-blur-md p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] dark:text-white">Categories</h1>
          <p className="text-[#4B5563] dark:text-slate-400 font-medium mt-1 leading-[1.6]">
            Manage marketplace subjects.
          </p>
        </div>
        <CategoryActions />
      </div>
      <div className="bg-white dark:bg-white/5 backdrop-blur-md rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 dark:border-white/10 overflow-hidden">
        <div className="p-6">
           <CategoryTable categories={data} />
        </div>
      </div>
    </div>
  );
}
