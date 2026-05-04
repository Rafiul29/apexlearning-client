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
import { Label } from "@/components/ui/label";

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
    <Card className="shadow-sm border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] rounded-[32px] overflow-hidden">
      <CardHeader className="pb-6 border-b dark:border-white/5">
        <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 text-slate-400">
          {editingSlot ? (
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Edit2 className="text-amber-500" size={16} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Plus className="text-emerald-500" size={16} />
            </div>
          )}
          {editingSlot ? "Modify Existing Slot" : "Create New Time Slot"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
              Teaching Subject
            </Label>
            <select
              {...register("categoryId")}
              className={cn(
                "w-full h-12 px-4 rounded-2xl border bg-slate-50 dark:bg-white/5 outline-none transition-all font-medium text-sm",
                errors.categoryId
                  ? "border-rose-500 focus:ring-rose-500/10"
                  : "border-slate-200 dark:border-white/10 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50",
              )}
            >
              <option value="" className="dark:bg-slate-900">Select Subject</option>
              {categories?.map((c: any) => (
                <option key={c.id} value={c.id} className="dark:bg-slate-900">
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest px-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.categoryId.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
              Preferred Day
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {DAYS.map((day, i) => (
                <label key={day} className="cursor-pointer group">
                  <input
                    type="radio"
                    value={i}
                    {...register("dayOfWeek")}
                    className="peer sr-only"
                  />
                  <div
                    className={cn(
                      "py-2.5 text-center rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                      "peer-checked:bg-emerald-600 peer-checked:text-white peer-checked:border-emerald-600 peer-checked:shadow-lg peer-checked:shadow-emerald-500/20",
                      errors.dayOfWeek
                        ? "border-rose-500 bg-rose-500/5"
                        : "border-slate-200 dark:border-white/10 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10",
                    )}
                  >
                    {day.substring(0, 3)}
                  </div>
                </label>
              ))}
            </div>
            {errors.dayOfWeek && (
              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest px-1 flex items-center gap-1 mt-1">
                <AlertCircle size={12} /> {errors.dayOfWeek.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
              Time Range
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  type="time"
                  {...register("startTime")}
                  className={cn(
                    "h-12 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-bold",
                    errors.startTime && "border-rose-500"
                  )}
                />
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest px-1">
                  START TIME
                </p>
              </div>
              <div className="space-y-2">
                <Input
                  type="time"
                  {...register("endTime")}
                  className={cn(
                    "h-12 rounded-2xl border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-bold",
                    errors.endTime && "border-rose-500"
                  )}
                />
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest px-1">END TIME</p>
              </div>
            </div>
            {(errors.startTime || errors.endTime) && (
              <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest px-1 flex items-center gap-1">
                <AlertCircle size={12} />{" "}
                {
                  (errors.startTime?.message ||
                    errors.endTime?.message) as string
                }
              </p>
            )}
          </div>

          <div className="pt-4 space-y-3">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" size={18} />
              ) : editingSlot ? (
                "Save Changes"
              ) : (
                "Create Time Slot"
              )}
            </Button>

            {editingSlot && (
              <Button
                variant="ghost"
                type="button"
                onClick={onCancel}
                className="w-full h-12 text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold rounded-full text-[10px] uppercase tracking-widest"
              >
                Discard Changes
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
