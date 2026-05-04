"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Loader2,
  GraduationCap,
  Briefcase,
  DollarSign,
  BookOpen,
  User as UserIcon,
  Phone,
} from "lucide-react";
import { Category } from "@/types";
import { saveTutorProfileAction } from "@/actions/tutors";

const tutorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please provide a valid phone number"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  education: z.string().min(2, "Education details are required"),
  experience: z.string().min(2, "Experience details are required"),
  experience_years: z.coerce.number().min(0, "Years cannot be negative"),
  pricePerHour: z.coerce.number().min(1, "Price must be at least $1"),
  subjects: z.string().min(1, "Please list at least one subject"),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});

export function TutorProfileForm({
  initialData,
  userId,
  mode,
  categories,
}: {
  initialData: any;
  userId: string;
  mode: boolean;
  categories: Category[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isEditMode = mode;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tutorSchema),
    defaultValues: {
      name: initialData?.user?.name || "",
      phone: initialData?.user?.phone || "",
      bio: initialData?.bio || "",
      education: initialData?.education || "",
      experience: initialData?.experience || "",
      experience_years: initialData?.experience_years || 0,
      pricePerHour: initialData?.pricePerHour || 0,
      subjects: initialData?.subjects?.join(", ") || "",
      categoryIds:
        initialData?.categories?.map((c: any) => c.id || c.categoryId) || [],
    },
  });

  const selectedCategories = watch("categoryIds");

  const toggleCategory = (id: string) => {
    const current = selectedCategories || [];
    const updated = current.includes(id)
      ? current.filter((item: string) => item !== id)
      : [...current, id];
    setValue("categoryIds", updated, { shouldValidate: true });
  };

  async function onSubmit(values: z.infer<typeof tutorSchema>) {
    setIsLoading(true);
    const formattedData = {
      ...values,
      userId,
      subjects: values.subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const res = await saveTutorProfileAction(
        formattedData,
        initialData?.id,
        userId,
      );

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(
          initialData?.id ? "Profile Updated!" : "Profile Created!",
        );
        router.refresh();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  const ErrorMsg = ({ message }: { message?: any }) => {
    if (!message) return null;
    return (
      <p className="text-red-500 text-[12px] mt-1 font-medium">
        {String(message)}
      </p>
    );
  };

  return (
    <Card className="border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm rounded-[32px] overflow-hidden">
      <CardHeader className="pb-8 border-b border-slate-100 dark:border-white/5">
        <CardTitle className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-2">
          {isEditMode ? "Update Your Profile" : "Setup Your Tutor Profile"}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-10 pt-10">
          {/* Section 0: Personal Information (User Model Fields) */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
              <UserIcon size={16} /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    {...register("name")}
                    className={cn(
                      "pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200",
                      errors.name && "border-red-500",
                    )}
                  />
                </div>
                <ErrorMsg message={errors.name?.message} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    {...register("phone")}
                    placeholder="+88017..."
                    className={cn(
                      "pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200",
                      errors.phone && "border-red-500",
                    )}
                  />
                </div>
                <ErrorMsg message={errors.phone?.message} />
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-white/5" />

          {/* Section 1: Education & Experience */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
              <GraduationCap size={16} /> Professional Background
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                  Education
                </label>
                <Input
                  {...register("education")}
                  placeholder="e.g. BSc in Computer Science"
                  className={cn(
                    "h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all",
                    errors.education && "border-rose-500",
                  )}
                />
                <ErrorMsg message={errors.education?.message} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  {...register("experience_years")}
                  className={cn(
                    "h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all",
                    errors.experience_years && "border-rose-500",
                  )}
                />
                <ErrorMsg message={errors.experience_years?.message} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                Experience Summary
              </label>
              <Textarea
                {...register("experience")}
                placeholder="Briefly describe your teaching experience..."
                className={cn(
                  "rounded-2xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all",
                  errors.experience && "border-rose-500",
                )}
              />
              <ErrorMsg message={errors.experience?.message} />
            </div>
          </div>

          <hr className="border-slate-100 dark:border-white/5" />

          {/* Section 2: Bio & Pricing */}
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
              <Briefcase size={16} /> About Your Services
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Detailed Bio
              </label>
              <Textarea
                {...register("bio")}
                rows={5}
                placeholder="Tell students more about your teaching style..."
                className={cn(
                  "bg-slate-50 dark:bg-slate-900 border-slate-200",
                  errors.bio && "border-red-500",
                )}
              />
              <ErrorMsg message={errors.bio?.message} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                  Hourly Rate ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="number"
                    {...register("pricePerHour")}
                    className={cn(
                      "h-12 pl-10 rounded-2xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all",
                      errors.pricePerHour && "border-rose-500",
                    )}
                  />
                </div>
                <ErrorMsg message={errors.pricePerHour?.message} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                  Subjects (comma separated)
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    {...register("subjects")}
                    placeholder="Math, Physics, React"
                    className={cn(
                      "h-12 pl-10 rounded-2xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all",
                      errors.subjects && "border-rose-500",
                    )}
                  />
                </div>
                <ErrorMsg message={errors.subjects?.message} />
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-white/5" />

          {/* Section 3: Categories Selection */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200 flex items-center gap-2">
              Teachable Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories?.map((cat) => {
                const isActive = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-200",
                      isActive
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20"
                        : "bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/10",
                    )}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
            <ErrorMsg message={errors.categoryIds?.message} />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t border-slate-100 dark:border-white/5 pt-6 pb-8 px-8 gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full px-10 h-14 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all uppercase tracking-widest text-[10px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Create Profile"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
