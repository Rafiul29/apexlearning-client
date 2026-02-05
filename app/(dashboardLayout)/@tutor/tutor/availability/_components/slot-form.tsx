"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Edit2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { saveSlotAction } from "@/actions/avilabilities";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const slotSchema = z
  .object({
    categoryId: z.string().min(1, "Subject is required"),
    dayOfWeek: z.preprocess(
      (val) =>
        val === "" || val === null || val === undefined
          ? undefined
          : Number(val),
      z.number().min(0).max(6),
    ),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (data) => {
      const [sH, sM] = data.startTime.split(":").map(Number);
      const [eH, eM] = data.endTime.split(":").map(Number);
      return eH * 60 + eM > sH * 60 + sM;
    },
    { message: "End time must be after start time", path: ["endTime"] },
  );

export default function SlotForm({
  tutorProfileId,
  categories,
  editingSlot,
  onSuccess,
  onCancel,
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(slotSchema),
    defaultValues: {
      dayOfWeek: "",
      startTime: "10:00",
      endTime: "11:00",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (editingSlot) {
      reset({
        ...editingSlot,
        dayOfWeek: editingSlot.dayOfWeek.toString(), // রেডিও বাটনের জন্য স্ট্রিং কনভার্সন
      });
    } else {
      reset({
        dayOfWeek: "",
        startTime: "10:00",
        endTime: "11:00",
        categoryId: "",
      });
    }
  }, [editingSlot, reset]);

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await saveSlotAction(
        { ...values, tutorProfileId },
        editingSlot?.id,
      );

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(editingSlot ? "Slot Updated" : "Slot Created");
        reset();
        onSuccess();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md border-slate-200 dark:border-slate-800">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          {editingSlot ? (
            <Edit2 className="text-amber-500" size={18} />
          ) : (
            <Plus className="text-green-500" size={18} />
          )}
          {editingSlot ? "Edit Slot" : "Add New Slot"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category selection */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">
              Subject
            </label>
            <select
              {...register("categoryId")}
              className={cn(
                "w-full h-10 px-3 rounded-md border bg-transparent outline-none transition-all",
                errors.categoryId
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-200 focus:ring-rose-500",
              )}
            >
              <option value="">Select Category</option>
              {categories?.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
                <AlertCircle size={12} /> {errors.categoryId.message as string}
              </p>
            )}
          </div>

          {/* Day Selection */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">
              Day
            </label>
            <div className="grid grid-cols-4 gap-1">
              {DAYS.map((day, i) => (
                <label key={day} className="cursor-pointer">
                  <input
                    type="radio"
                    value={i}
                    {...register("dayOfWeek")}
                    className="peer sr-only"
                  />
                  <div
                    className={cn(
                      "py-2 text-center rounded border text-[10px] transition-all",
                      "peer-checked:bg-rose-600 peer-checked:text-white peer-checked:border-rose-600",
                      errors.dayOfWeek
                        ? "border-red-500 bg-red-50/50"
                        : "border-slate-200 hover:bg-slate-50",
                    )}
                  >
                    {day.substring(0, 3)}
                  </div>
                </label>
              ))}
            </div>
            {errors.dayOfWeek && (
              <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 mt-1">
                <AlertCircle size={12} /> {errors.dayOfWeek.message as string}
              </p>
            )}
          </div>

          {/* Time Range */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">
              Time Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Input
                  type="time"
                  {...register("startTime")}
                  className={cn(errors.startTime && "border-red-500")}
                />
                <p className="text-[9px] text-slate-400 font-bold">
                  START TIME
                </p>
              </div>
              <div className="space-y-1">
                <Input
                  type="time"
                  {...register("endTime")}
                  className={cn(errors.endTime && "border-red-500")}
                />
                <p className="text-[9px] text-slate-400 font-bold">END TIME</p>
              </div>
            </div>
            {(errors.startTime || errors.endTime) && (
              <p className="text-[11px] text-red-500 font-medium flex items-center gap-1">
                <AlertCircle size={12} />{" "}
                {
                  (errors.startTime?.message ||
                    errors.endTime?.message) as string
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-600 hover:bg-rose-700"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : editingSlot ? (
              "Save Changes"
            ) : (
              "Add Slot"
            )}
          </Button>

          {editingSlot && (
            <Button
              variant="ghost"
              type="button"
              onClick={onCancel}
              className="w-full text-slate-500"
            >
              Cancel
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
