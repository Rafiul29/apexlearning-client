
"use server";

import { revalidatePath } from "next/cache";
import { bookingService } from "@/services/booking.service";


export async function createBookingAction(payload: {
    tutorProfileId: string;
    availabilityId: string;
    slotDate: string
}) {
    const result = await bookingService.createBooking(payload);

    if (result.error) {
        return { success: false, message: result.error };
    }

    revalidatePath(`/tutors/${payload.tutorProfileId}`);

    return {
        success: true,
        message: "Booking confirmed successfully!",
        data: result.data
    };
}

export async function updateBookingAction(id: string, data: any) {
    const result = await bookingService.updateBooking(id, data);

    if (result.error) {
        return { success: false, message: result.error };
    }

    revalidatePath("/dashboard/student/bookings");
    // revalidatePath("/dashboard/tutor/appointments");

    return { success: true, message: "Booking updated successfully" };
}


