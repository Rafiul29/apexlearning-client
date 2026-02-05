"use server";

import { reviewService } from "@/services/review.service";
import { revalidatePath } from "next/cache";

export async function submitReviewAction(payload: {
  rating: number;
  content: string;
  bookingId: string;
  tutorProfileId: string;
}) {
  const result = await reviewService.createReview(payload);

  if (result.error) {
    return { success: false, message: result.error };
  }

  revalidatePath("/dashboard/bookings");

  return { success: true, message: "Review submitted successfully!" };
}
