"use server";

import { availabilityService } from "@/services/avilabilities.service";
import { updateTag } from "next/cache";


export async function findTutorSlotsAction(tutorId: string) {
    if (!tutorId) return { data: null, error: "Tutor ID is required" };

    const result = await availabilityService.getSlotsByTutorId(tutorId, {
        revalidate: 60,
    });

    return result;
}

export async function saveSlotAction(payload: any, slotId?: string) {
    let result;

    if (slotId) {
        result = await availabilityService.updateSlot(slotId, payload);
    } else {
        result = await availabilityService.createSlot(payload);
    }

    if (!result.error) {
        updateTag(`slots-${payload.tutorProfileId}`);
    }

    return result;
}

export async function deleteSlotAction(slotId: string, tutorProfileId: string) {
    const result = await availabilityService.deleteSlot(slotId);

    if (!result.error) {
        updateTag(`slots-${tutorProfileId}`);
    }

    return result;
}