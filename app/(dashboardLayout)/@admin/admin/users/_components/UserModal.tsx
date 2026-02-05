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
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit User Account
          </DialogTitle>
        </DialogHeader>
        {user && <UserEditForm user={user} onSuccess={onClose} />}
      </DialogContent>
    </Dialog>
  );
}
