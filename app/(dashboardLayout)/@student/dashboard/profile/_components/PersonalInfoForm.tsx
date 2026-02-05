"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, User, Phone, Loader2, Mail, ShieldCheck, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge"; // Ensure you have this shadcn component
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { updateProfileAction } from "@/actions/user";

const profileSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    phone: z.string().min(10, "Invalid phone number").or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function PersonalInfoForm({ initialData }: { initialData: any }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: initialData?.name || "",
            phone: initialData?.phone || "",
        },
    });

    const onSubmit = async (values: ProfileFormValues) => {
        const result = await updateProfileAction(values);
        if (result.success) {
            toast.success(result.message || "Profile updated successfully!", {
                description: "Your changes have been saved to our servers.",
            });
        } else {
            toast.error(result.message || "An error occurred", {
                description: "Please check your information and try again.",
            });
        }
    }

    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-lg">Personal Information</CardTitle>
                        <CardDescription>Update your basic contact details.</CardDescription>
                    </div>

                    {/* Status & Role Badges */}
                    <div className="flex gap-2">
                        <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-3 border-slate-200">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">
                                {initialData?.role || "STUDENT"}
                            </span>
                        </Badge>
                        <Badge
                            className={cn(
                                "flex items-center gap-1.5 py-1 px-3 border-none",
                                initialData?.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            )}
                        >
                            <Activity className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">
                                {initialData?.status || "ACTIVE"}
                            </span>
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input id="name" className="pl-10" {...register("name")} />
                            </div>
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        {/* Email Field - Disabled */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <Input id="email" className="pl-10 bg-slate-50" defaultValue={initialData?.email} disabled />
                            </div>
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <Input id="phone" className="pl-10" placeholder="+1..." {...register("phone")} />
                        </div>
                        {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                        <p className="text-[11px] text-slate-400">
                            Account created on {new Date(initialData?.createdAt).toLocaleDateString()}
                        </p>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isDirty}
                            className="bg-rose-600 hover:bg-rose-700 min-w-[140px]"
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}