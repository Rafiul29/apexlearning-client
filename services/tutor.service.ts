import { env } from "@/env";
import { cookies } from "next/headers";

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

    createTutorProfile: async function (payload: any) {
        try {
            console.log(payload)
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/tutors`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create profile");

            return { data: result.data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    },

    updateTutorProfile: async function (id: string, payload: any) {
        try {
            const cookieStore = await cookies();

            const isFormData = payload instanceof FormData;

            const res = await fetch(`${API_URL}/tutors/profile`, {
                method: "PUT",
                headers: {
                    ...(isFormData ? {} : { "Content-Type": "application/json" }),
                    Cookie: cookieStore.toString(),
                },
                body: isFormData ? payload : JSON.stringify(payload),
            });

            const result = await res.json();
            console.log(result)
            if (!res.ok) throw new Error(result.message || "Failed to update profile");

            return { data: result.data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    },

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
    },

    getTutorByUserId: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const cookieString = cookieStore.toString();
            const res = await fetch(`${API_URL}/tutors/user/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...(cookieString && { Cookie: cookieString }),
                },
                next: {
                    revalidate: 60,
                    tags: [`tutor-${id}`]
                }
            });

            if (!res.ok) {
                return { data: null, error: `Error: ${res.statusText}` };
            }
            const result = await res.json();
            return {
                data: result.data || result,
                error: null
            };
        } catch (err) {
            console.error("Fetch error in getTutorByUserId:", err);
            return {
                data: null,
                error: "Something went wrong while fetching the tutor profile."
            };
        }
    }
}