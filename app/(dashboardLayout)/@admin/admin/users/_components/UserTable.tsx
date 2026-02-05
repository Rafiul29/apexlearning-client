"use client";

import { useState } from "react";
import { Pencil, Trash2, User as UserIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { UserModal } from "./UserModal";
import Image from "next/image";
import { deleteUserAction } from "@/actions/user";

export function UserTable({ users }: { users: any[] }) {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const res = await deleteUserAction(id);
    if (res.success) toast.success(res.message);
    else toast.error(res.message);
  };

  return (
    <>
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="pl-6">User</TableHead>
            <TableHead className="pl-6">Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right pr-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="group hover:bg-slate-50/50">
              <TableCell className="pl-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    {user.image ? (
                      <Image
                        src={user?.image}
                        className="rounded-full"
                        alt={user.name}
                        width={120}
                        height={120}
                      />
                    ) : (
                      <UserIcon size={20} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">
                      {user.name}
                    </span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "ADMIN" ? "default" : "secondary"}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === "ACTIVE"
                      ? "success"
                      : ("destructive" as any)
                  }
                  className={
                    user.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                      : ""
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-6">
                <div className="flex justify-end gap-2  transition-all">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedUser(user)}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(user.id)}
                    className="h-8 w-8 p-0 text-rose-500 hover:bg-rose-50 border-slate-200"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
}
