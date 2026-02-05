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
        <Label htmlFor="name" className="text-sm font-bold">
          Category Name
        </Label>
        <Input
          {...register("name")}
          id="name"
          placeholder="e.g. Science & Tech"
          className={errors.name ? "border-rose-500" : "bg-white"}
        />
        {errors.name && (
          <p className="text-[11px] text-rose-500 font-medium italic">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-bold">
          Description
        </Label>
        <Textarea
          {...register("description")}
          id="description"
          placeholder="What is this category about?"
          className={`min-h-[100px] resize-none ${errors.description ? "border-rose-500" : "bg-white"}`}
        />
        {errors.description && (
          <p className="text-[11px] text-rose-500 font-medium italic">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
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