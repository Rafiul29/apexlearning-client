"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateUserAction } from "@/actions/user";

const userSchema = z.object({
  role: z.enum(["STUDENT", "TUTOR", "ADMIN"]),
  status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED", "SUSPENDED", "BAN"]),
});

type UserSchemaValues = z.infer<typeof userSchema>;

export function UserEditForm({
  user,
  onSuccess,
}: {
  user: any;
  onSuccess: () => void;
}) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<UserSchemaValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: user.role,
      status: user.status,
    },
  });

  const currentRole = watch("role");
  const currentStatus = watch("status");

  const onSubmit = async (values: UserSchemaValues) => {
    const res = await updateUserAction(user.id, values);
    if (res.success) {
      toast.success(res.message);
      onSuccess();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
      {/* Read-Only Information Section */}
      <div className="grid grid-cols-1 gap-4 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
        <div className="space-y-1">
          <Label className="text-emerald-600 dark:text-emerald-500 text-[10px] uppercase tracking-widest font-black">
            Full Name
          </Label>
          <p className="text-sm font-black text-slate-900 dark:text-white">{user.name}</p>
        </div>
        <div className="space-y-1">
          <Label className="text-emerald-600 dark:text-emerald-500 text-[10px] uppercase tracking-widest font-black">
            Email Address
          </Label>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{user.email}</p>
        </div>
        <div className="space-y-1">
          <Label className="text-emerald-600 dark:text-emerald-500 text-[10px] uppercase tracking-widest font-black">
            Contact Phone
          </Label>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{user.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        {/* Role Selection */}
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Role</Label>
          <Select
            value={currentRole}
            onValueChange={(v) => setValue("role", v as any)}
          >
            <SelectTrigger className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 w-full rounded-xl font-bold h-12">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 dark:border-white/10 shadow-2xl dark:bg-[#0a0a0a]">
              <SelectItem value="STUDENT" className="font-bold py-2.5">Student</SelectItem>
              <SelectItem value="TUTOR" className="font-bold py-2.5">Tutor</SelectItem>
              <SelectItem value="ADMIN" className="font-bold py-2.5">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Selection */}
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Status</Label>
          <Select
            value={currentStatus}
            onValueChange={(v) => setValue("status", v as any)}
          >
            <SelectTrigger className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 w-full rounded-xl font-bold h-12">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-slate-200 dark:border-white/10 shadow-2xl dark:bg-[#0a0a0a]">
              <SelectItem value="ACTIVE" className="text-emerald-600 font-bold py-2.5 focus:bg-emerald-50 dark:focus:bg-emerald-500/10">
                Active
              </SelectItem>
              <SelectItem value="INACTIVE" className="font-bold py-2.5">Inactive</SelectItem>
              <SelectItem value="BLOCKED" className="text-amber-600 font-bold py-2.5">
                Blocked
              </SelectItem>
              <SelectItem value="SUSPENDED" className="text-orange-600 font-bold py-2.5">
                Suspended
              </SelectItem>
              <SelectItem value="BAN" className="text-rose-600 font-bold py-2.5 focus:bg-rose-50 dark:focus:bg-rose-500/10">
                Ban
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl h-14 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all uppercase tracking-widest text-[10px] mt-6"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Saving Changes...
          </div>
        ) : (
          "Update User Permissions"
        )}
      </Button>
    </form>
  );
}
