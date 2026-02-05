import { categoryService } from "@/services/category.service";
import { CategoryActions } from "../_components/category/CategoryActions";
import { CategoryTable } from "../_components/category/CategoryTable";

export default async function CategoriesPage() {
  const { data, error } = await categoryService.getCategories();

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-slate-500 font-medium">
            Manage marketplace subjects.
          </p>
        </div>
        <CategoryActions />
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CategoryTable categories={data} />
      </div>
    </div>
  );
}
