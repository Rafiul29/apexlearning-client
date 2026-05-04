"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserEditForm } from "./UserEditForm";

export function UserModal({
  user,
  isOpen,
  onClose,
}: {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            Edit User Account
          </DialogTitle>
        </DialogHeader>
        {user && <UserEditForm user={user} onSuccess={onClose} />}
      </DialogContent>
    </Dialog>
  );
}
