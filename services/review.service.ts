import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL

export const reviewService = {
    createReview: async function (payload: {
        rating: number;
        content: string;
        bookingId: string;
        tutorProfileId: string;
    }) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to submit review");

            return { data: result.data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    }
};