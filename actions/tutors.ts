"use server";

import { TutorService } from "@/services/tutor.service";

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

export async function getTutorsAction(params?: GetTutorParams, options?: ServiceOptions) {
    return await TutorService.getTutors({ ...params }, { ...options });
}
