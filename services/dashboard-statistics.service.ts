import { env } from "@/env";
import { cookies } from "next/headers";
const API_URL = env.API_URL

export const dashboardStatisticsService = {
    getDashboardStatistics: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/dashboard/statistics`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                next: { revalidate: 0 }
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.message || "Failed to fetch statistics");
            

            return { data: result.data, error: null };
        } catch (err: any) {
            return { data: null, error: err.message };
        }
    }
}