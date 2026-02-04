import { env } from "@/env";

const API_URL = env.API_URL

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetTutorParams {
    searchTerm?: string;
    page?: string;
    limit?: string;
    minPrice?: string;
    maxPrice?: string;
    categoryId?: string;
    sortBy?: string;
    sortOrder?: string;
    rating?: string
    skip?: string
}

export const TutorService = {
    getTutors: async function (params?: GetTutorParams, options?: ServiceOptions) {
        try {

            const url = new URL(`${API_URL}/tutors`)

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

            config.next = { ...config.next, tags: ['Tutor'] }

            const res = await fetch(url.toString(), config)

            const data = await res.json();

            return { data: data.data, error: null };

        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }

    },
    getTutorById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/tutors/${id}`, {
                next: { revalidate: 60 }
            });
            if (!res.ok) return { data: null, error: "Tutor not found" };
            const result = await res.json();
            return { data: result.data, error: null };
        } catch (err) {
            return { data: null, error: err };
        }
    }
}