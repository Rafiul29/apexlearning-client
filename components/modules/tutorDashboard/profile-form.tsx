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
    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md">
      <CardHeader className="border-b border-slate-100 dark:border-slate-900 pb-4">
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          {isEditMode ? "Update Your Profile" : "Setup Your Tutor Profile"}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-8 pt-6">
          {/* Section 0: Personal Information (User Model Fields) */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-rose-600 dark:text-rose-500">
              <UserIcon size={20} /> Personal Information
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

          <hr className="border-slate-100 dark:border-slate-900" />

          {/* Section 1: Education & Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-rose-600 dark:text-rose-500">
              <GraduationCap size={20} /> Professional Background
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Education
                </label>
                <Input
                  {...register("education")}
                  placeholder="e.g. BSc in Computer Science"
                  className={cn(
                    "bg-slate-50 dark:bg-slate-900 border-slate-200",
                    errors.education && "border-red-500",
                  )}
                />
                <ErrorMsg message={errors.education?.message} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Years of Experience
                </label>
                <Input
                  type="number"
                  {...register("experience_years")}
                  className={cn(
                    "bg-slate-50 dark:bg-slate-900 border-slate-200",
                    errors.experience_years && "border-red-500",
                  )}
                />
                <ErrorMsg message={errors.experience_years?.message} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Experience Summary
              </label>
              <Textarea
                {...register("experience")}
                placeholder="Briefly describe your teaching experience..."
                className={cn(
                  "bg-slate-50 dark:bg-slate-900 border-slate-200",
                  errors.experience && "border-red-500",
                )}
              />
              <ErrorMsg message={errors.experience?.message} />
            </div>
          </div>

          {/* Section 2: Bio & Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-rose-600 dark:text-rose-500">
              <Briefcase size={20} /> About Your Services
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
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Hourly Rate ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="number"
                    {...register("pricePerHour")}
                    className={cn(
                      "pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200",
                      errors.pricePerHour && "border-red-500",
                    )}
                  />
                </div>
                <ErrorMsg message={errors.pricePerHour?.message} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Subjects (comma separated)
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    {...register("subjects")}
                    placeholder="Math, Physics, React"
                    className={cn(
                      "pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200",
                      errors.subjects && "border-red-500",
                    )}
                  />
                </div>
                <ErrorMsg message={errors.subjects?.message} />
              </div>
            </div>
          </div>

          {/* Section 3: Categories Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
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
                      "px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200",
                      isActive
                        ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                        : "bg-transparent text-slate-600 border-slate-200 hover:border-rose-400",
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

        <CardFooter className="flex justify-end border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50 py-4 px-6 gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-rose-600 hover:bg-rose-700 text-white min-w-[140px]"
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
