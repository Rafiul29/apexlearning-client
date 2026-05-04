"use server";


import { userService } from "@/services/user.service";
import { revalidateTag, updateTag } from "next/cache";

export async function updateUserAction(id: string, values: any) {
    const result = await userService.updateUser(id, values);

    if (result.error) {
        return { success: false, message: result.error };
    }
    revalidateTag("Users", '');
    return { success: true, message: "User updated successfully" };
}

export async function deleteUserAction(id: string) {
    const result = await userService.deleteUser(id);

    if (result.error) {
        return { success: false, message: result.error };
    }

    revalidateTag("Users", '');
    return { success: true, message: "User deleted successfully" };
}

export async function updateProfileAction(payload: { name: string; phone: string }) {


    const result = await userService.updateUserProfile(payload);

    if (result.error) {
        return {
            success: false,
            message: typeof result.error === "string" ? result.error : "Failed to update profile"
        };
    }

    updateTag("/dashboard/profile");

    return {
        success: true,
        message: "Profile updated successfully!",
        data: result.data
    };
}