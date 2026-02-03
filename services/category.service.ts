import { env } from "@/env";

const API_URL = env.API_URL

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}


interface GetCategoryParams {
    limit?: string;
}

export const categoryService = {
    getCategories: async function (params?: GetCategoryParams, options?: ServiceOptions) {
        try {

            const url = new URL(`${API_URL}/categories`);

            // 2. Append params only if they exist
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value);
                    }
                });
            }

            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }

            config.next = { ...config.next, tags: ['Categories'] }

            const res = await fetch(url, config);
            const data = await res.json();

            return { data: data.data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }

    }
}