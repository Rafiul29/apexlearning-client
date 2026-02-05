import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
    tags?: string[];
}

export const availabilityService = {
    getSlotsByTutorId: async function (tutorProfileId: string, options?: ServiceOptions) {
        try {
            const cookieStore = await cookies();
            const cookieString = cookieStore.toString();
            const url = `${API_URL}/availabilities/tutor/${tutorProfileId}`;

            const config: RequestInit = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    ...(cookieString && { Cookie: cookieString }),
                },
                next: {
                    revalidate: options?.revalidate || 60,
                    tags: options?.tags || [`slots-${tutorProfileId}`]
                }
            };

            const res = await fetch(url, config);
            const result = await res.json();

            return { data: result.data || result, error: null };
        } catch (err) {
            return { data: null, error: "Failed to fetch slots" };
        }
    },
    createSlot: async function (payload: any) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/availabilities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create");

            return { data: result.data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    },

    updateSlot: async function (slotId: string, payload: any) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/availabilities/${slotId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Update failed");

            return { data: result.data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    },

    deleteSlot: async function (slotId: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/availabilities/${slotId}`, {
                method: "DELETE",
                headers: { Cookie: cookieStore.toString() },
            });

            if (!res.ok) throw new Error("Delete failed");
            return { data: true, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    }
};