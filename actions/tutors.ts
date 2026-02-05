"use server";

import { TutorService } from "@/services/tutor.service";
import { updateTag } from "next/cache";

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


export async function saveTutorProfileAction(payload: any, tutorId?: string, userId?: string) {

    let result;

    if (tutorId) {
        result = await TutorService.updateTutorProfile(tutorId, payload);
    } else {
        result = await TutorService.createTutorProfile(payload);
    }
    if (!result.error && userId) {
        updateTag(`tutor-${userId}`);
    }

    return result;
}