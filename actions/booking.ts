
"use server";

import { revalidatePath, updateTag } from "next/cache";
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


export async function updateBookingStatusAction(id: string, newStatus: string, meetLink?: string) {

    const result = await bookingService.updateBookingStatus(id, newStatus, meetLink);

    if (result.error) {
        return { success: false, message: result.error };
    }

    updateTag("Bookings")

    return { success: true, message: `Booking ${newStatus.toLowerCase()} successfully!` };
}