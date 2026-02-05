import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL

export const bookingService = {
    getbookings: async function () {
        const cookieStore = await cookies();
        try {
            const res = await fetch(`${API_URL}/bookings`, {
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                next: {
                    tags: ["Bookings"]
                }
            });
            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create");
            return { data: result.data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    },
    createBooking: async function (payload: { tutorProfileId: string; availabilityId: string, slotDate: string }) {
        const cookieStore = await cookies();
        try {
            const res = await fetch(`${API_URL}/bookings`, {
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

    updateBooking: async function (id: string, data: { name: string; description?: string }) {
        try {
            const res = await fetch(`${API_URL}/bookings/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (!res.ok) throw new Error(result.message || "Failed to update");
            return { data: result.data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    },
    updateBookingStatus: async function (id: string, status: string, meetLink?: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/bookings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ status, meetLink }),
            });
            const result = await res.json();

            if (!res.ok) throw new Error(result.message || "Failed to update status");
            return { data: result.data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    },
}