"use server";

import { TutorService } from "@/services/tutor.service";
import { revalidatePath, updateTag } from "next/cache";

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
  rating?: string;
  skip?: string;
}

export async function getTutorsAction(
  params?: GetTutorParams,
  options?: ServiceOptions,
) {
  return await TutorService.getTutors({ ...params }, { ...options });
}

export async function saveTutorProfileAction(
  payload: any,
  tutorId?: string,
  userId?: string,
) {
  let result;

  if (tutorId) {
    result = await TutorService.updateTutorProfile(tutorId, payload);
    if (!result.data) {
      const { name, phone, ...createPayload } = payload;
      result = await TutorService.createTutorProfile(createPayload);
      if (result) {
        result = await TutorService.updateTutorProfile(result.data.id, payload);
      }
    }
  } else {
    const { name, phone, ...createPayload } = payload;
    result = await TutorService.createTutorProfile(createPayload);
    if (result) {
      result = await TutorService.updateTutorProfile(result.data.id, payload);
    }
  }
  if (!result.error && userId) {
    updateTag(`tutor-${userId}`);
    revalidatePath("/tutor/dashboard", "page");
    revalidatePath("/tutor/profile", "page");
    revalidatePath("/tutor/availability", "page");
  }

  return result;
}
