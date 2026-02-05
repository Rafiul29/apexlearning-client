"use server"

import { categoryService } from "@/services/category.service";
import { revalidateTag, updateTag } from "next/cache";

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetCategoryParams {
    limit?: string;
}

export async function getCategoriesAction(params?: GetCategoryParams, options?: ServiceOptions) {
    return await categoryService.getCategories({ ...params }, { ...options });
}


export async function saveCategoryAction(data: { name: string, description?: string }, id?: string) {
    let result;

    const payload = {
        name: data.name,
        description: data.description ?? "",
    };

    if (id) {
        result = await categoryService.updateCategory(id, payload);
    } else {
        result = await categoryService.createCategory(payload);
    }

    if (result.error) {
        return { success: false, message: result.error };
    }
    revalidateTag("Categories", '');

    return { success: true, message: id ? "Updated successfully" : "Created successfully" };
}



export async function deleteCategoryAction(id: string) {
    const result = await categoryService.deleteCategory(id);

    if (result.error) {
        return { success: false, message: result.error };
    }

    updateTag("Categories");

    return { success: true, message: "Category deleted successfully" };
}