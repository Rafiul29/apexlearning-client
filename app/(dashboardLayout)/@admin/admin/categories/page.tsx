import { categoryService } from "@/services/category.service";
import { CategoryActions } from "../_components/category/CategoryActions";
import { CategoryTable } from "../_components/category/CategoryTable";
export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const { data, error } = await categoryService.getCategories();


  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            Subjects & <span className="text-emerald-600">Categories</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage marketplace subjects and learning streams.
          </p>
        </div>
        <CategoryActions />
      </div>
      <div className="bg-white dark:bg-white/[0.02] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden transition-all">
        <CategoryTable categories={data} />
      </div>
    </div>
  );

}