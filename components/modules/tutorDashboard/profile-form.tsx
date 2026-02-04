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
} from "lucide-react";
import { getCategoriesAction } from "@/actions/categories";
import { Category } from "@/types";

const tutorSchema = z.object({
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
}: {
  initialData: any;
  userId: string;
  mode: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isEditMode = mode;
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { data, error } = await getCategoriesAction(
          {},
          { revalidate: 3600 },
        );
        if (!error && data) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    fetchInitialData();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tutorSchema),
    defaultValues: {
      bio: initialData?.bio || "",
      education: initialData?.education || "",
      experience: initialData?.experience || "",
      experience_years: initialData?.experience_years || 0,
      pricePerHour: initialData?.pricePerHour || 0,
      subjects: initialData?.subjects?.join(", ") || "",
      categoryIds: initialData?.categories?.map((c: any) => c.id) || [],
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
    console.log(values);

    try {
      const endpoint = isEditMode ? `/api/tutors/update` : `/api/tutors/create`;
      const method = isEditMode ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify(formattedData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success(isEditMode ? "Profile updated!" : "Profile created!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Common error component with Inline CSS to ensure it's RED
  const ErrorMsg = ({ message }: { message?: any }) => {
    if (!message) return null;
    return (
      <p
        style={{
          color: "#ef4444",
          fontSize: "12px",
          marginTop: "4px",
          fontWeight: "500",
        }}
      >
        {String(message)}
      </p>
    );
  };

  return (
    <Card className="max-w-4xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md">
      <CardHeader className="border-b border-slate-100 dark:border-slate-900 pb-4">
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          {isEditMode ? "Update Your Profile" : "Setup Your Tutor Profile"}
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-8 pt-6">
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
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="number"
                    {...register("pricePerHour")}
                    className={cn(
                      "pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200",
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
                  <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    {...register("subjects")}
                    className={cn(
                      "pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200",
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
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Main Categories
            </h3>
            <div className="flex flex-wrap gap-3">
              {categories?.map((cat) => {
                const isActive = selectedCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className="px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer duration-200"
                    style={{
                      backgroundColor: isActive ? "#16a34a" : "transparent",
                      color: isActive ? "#ffffff" : "inherit",
                      borderColor: isActive ? "#16a34a" : "#e2e8f0",
                    }}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
            <ErrorMsg message={errors.categoryIds?.message} />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50 py-4 px-6">
          <Button
            type="submit"
            disabled={isLoading}
            className=""
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Create Profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
