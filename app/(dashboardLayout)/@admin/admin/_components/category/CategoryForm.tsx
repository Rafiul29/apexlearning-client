// components/admin/CategoryForm.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { saveCategoryAction } from "@/actions/categories"; // Ensure this path is correct
import { toast } from "sonner";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),
  description: z
    .string()
    .max(500, "Description is too long")
    .optional()
    .or(z.literal("")),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface Props {
  initialData?: any; // Using any here to handle the id safely
  onSuccess: () => void;
}

export function CategoryForm({ initialData, onSuccess }: Props) {
  const isEditMode = !!initialData?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        description: initialData.description || "",
      });
    } else {
      reset({ name: "", description: "" });
    }
  }, [initialData, reset]);

  const onSubmit = async (values: CategoryFormValues) => {
    // The payload ensures we don't send 'null' to the service
    const payload = {
      name: values.name,
      description: values.description ?? "",
    };

    const result = await saveCategoryAction(payload, initialData?.id);

    if (result.success) {
      toast.success(result.message);
      onSuccess();
    } else {
      toast.error(result.message);
      console.error("Submission failed:", result.message);
    }
  }; // Fixed: Removed the extra }; that was here causing the crash

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Category Name
        </Label>
        <Input
          {...register("name")}
          id="name"
          placeholder="e.g. Science & Tech"
          className={`h-12 rounded-xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all ${errors.name ? "border-rose-500" : ""}`}
        />
        {errors.name && (
          <p className="text-[10px] text-rose-500 font-bold">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Description
        </Label>
        <Textarea
          {...register("description")}
          id="description"
          placeholder="What is this category about?"
          className={`min-h-[120px] rounded-2xl bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 font-bold outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all resize-none ${errors.description ? "border-rose-500" : ""}`}
        />
        {errors.description && (
          <p className="text-[10px] text-rose-500 font-bold">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl h-14 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all uppercase tracking-widest text-[10px]"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Saving...
            </div>
          ) : isEditMode ? (
            "Save Changes"
          ) : (
            "Add Category"
          )}
        </Button>
      </div>
    </form>
  );
}