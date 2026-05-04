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
import { cn } from "@/lib/utils";
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
        <TableHeader className="bg-slate-50 dark:bg-white/5">
          <TableRow className="hover:bg-transparent dark:border-white/5">
            <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">User</TableHead>
            <TableHead className="pl-6 text-[10px] font-black uppercase tracking-widest">Phone</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest">Role</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
            <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] dark:border-white/5 transition-colors">
              <TableCell className="pl-8 py-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user?.image}
                        className="rounded-full w-full h-full object-cover"
                        alt={user.name}
                        width={120}
                        height={120}
                      />
                    ) : (
                      <UserIcon size={18} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900 dark:text-white tracking-tight leading-none">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{user.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-bold text-slate-600 dark:text-slate-300 text-xs pl-6">{user.phone || "—"}</TableCell>
              <TableCell>
                <Badge
                  variant={user.role === "ADMIN" ? "default" : "secondary"}
                  className={cn(
                     "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-none",
                     user.role === "ADMIN" 
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" 
                        : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                  )}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                     "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-none",
                     user.status === "ACTIVE" 
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                        : "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                  )}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right pr-8">
                <div className="flex justify-end gap-2 transition-all">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedUser(user)}
                    className="h-9 w-9 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-600 transition-all"
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(user.id)}
                    className="h-9 w-9 rounded-xl text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 transition-all"
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
