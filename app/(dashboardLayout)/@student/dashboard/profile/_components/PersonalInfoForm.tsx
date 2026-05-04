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
        <Card className="border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm rounded-[32px] overflow-hidden">
            <CardHeader className="pb-8 border-b border-slate-100 dark:border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <CardTitle className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-2">Personal Information</CardTitle>
                        <CardDescription className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            Update your basic contact details
                        </CardDescription>
                    </div>

                    {/* Status & Role Badges */}
                    <div className="flex gap-2">
                        <Badge variant="outline" className="flex items-center gap-2 py-2 px-4 border-slate-200 dark:border-white/10 rounded-full bg-slate-50 dark:bg-white/5">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
                                {initialData?.role || "STUDENT"}
                            </span>
                        </Badge>
                        <Badge
                            className={cn(
                                "flex items-center gap-2 py-2 px-4 border-none rounded-full shadow-lg transition-transform hover:scale-105",
                                initialData?.status === "ACTIVE" 
                                    ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                                    : "bg-amber-500 text-white shadow-amber-500/20"
                            )}
                        >
                            <Activity className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.1em]">
                                {initialData?.status || "ACTIVE"}
                            </span>
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Name Field */}
                        <div className="space-y-3">
                            <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Name</Label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                <Input 
                                    id="name" 
                                    className="h-12 pl-12 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all font-medium" 
                                    {...register("name")} 
                                />
                            </div>
                            {errors.name && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest px-1">{errors.name.message}</p>}
                        </div>

                        {/* Email Field - Disabled */}
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Address</Label>
                            <div className="relative opacity-60">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input 
                                    id="email" 
                                    className="h-12 pl-12 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/10 font-medium" 
                                    defaultValue={initialData?.email} 
                                    disabled 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-3">
                        <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Phone Number</Label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <Input 
                                id="phone" 
                                className="h-12 pl-12 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all font-medium" 
                                placeholder="+1 (555) 000-0000" 
                                {...register("phone")} 
                            />
                        </div>
                        {errors.phone && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest px-1">{errors.phone.message}</p>}
                    </div>

                    <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-100 dark:border-white/5">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                            Member since {new Date(initialData?.createdAt).toLocaleDateString()}
                        </p>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isDirty}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full px-10 h-14 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all uppercase tracking-widest text-[10px] w-full sm:w-auto"
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-5 w-5" />
                            )}
                            Update Account
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}