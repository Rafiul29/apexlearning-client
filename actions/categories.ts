"use server"

import { categoryService } from "@/services/category.service";

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
