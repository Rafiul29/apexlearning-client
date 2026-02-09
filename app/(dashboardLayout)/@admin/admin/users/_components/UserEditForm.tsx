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
      <div className="grid grid-cols-1 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
        <div className="space-y-1">
          <Label className="text-slate-500 text-[11px] uppercase tracking-wider">
            Full Name
          </Label>
          <p className="text-sm font-semibold text-slate-700">{user.name}</p>
        </div>
        <div className="space-y-1">
          <Label className="text-slate-500 text-[11px] uppercase tracking-wider">
            Email Address
          </Label>
          <p className="text-sm font-medium text-slate-600">{user.email}</p>
        </div>
        <div className="space-y-1">
          <Label className="text-slate-500 text-[11px] uppercase tracking-wider">
            Contact Phone
          </Label>
          <p className="text-sm font-medium text-slate-600">{user.phone}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        {/* Role Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-bold">Role</Label>
          <Select
            value={currentRole}
            onValueChange={(v) => setValue("role", v as any)}
          >
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STUDENT">Student</SelectItem>
              <SelectItem value="TUTOR">Tutor</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-bold">Status</Label>
          <Select
            value={currentStatus}
            onValueChange={(v) => setValue("status", v as any)}
          >
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE" className="text-emerald-600">
                Active
              </SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
              <SelectItem value="BLOCKED" className="text-amber-600">
                Blocked
              </SelectItem>
              <SelectItem value="SUSPENDED" className="text-orange-600">
                Suspended
              </SelectItem>
              <SelectItem value="BAN" className="text-rose-600">
                Ban
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white hover:bg-slate-800 transition-all font-bold mt-4"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Saving Changes...
          </div>
        ) : (
          "Update User Permissions"
        )}
      </Button>
    </form>
  );
}
