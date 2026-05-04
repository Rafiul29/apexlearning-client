// components/admin/CategoryTable.tsx
"use client";

import { useState } from "react";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "./CategoryModal";
import { deleteCategoryAction } from "@/actions/categories";
import { toast } from "sonner";

export function CategoryTable({ categories }: { categories: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const result = await deleteCategoryAction(id);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-white/5">
          <TableRow className="hover:bg-transparent dark:border-white/5">
            <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">
              Name
            </TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-widest">
              Description
            </TableHead>
            <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] dark:border-white/5 transition-colors">
              <TableCell className="pl-8 py-4 font-black text-slate-900 dark:text-white tracking-tight">
                {cat.name}
              </TableCell>
              <TableCell className="text-slate-500 dark:text-slate-400 max-w-xs truncate font-bold text-xs">
                {cat.description || (
                  <span className="italic text-slate-300 dark:text-slate-600 font-bold">
                    No description provided
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right pr-8">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedCategory(cat)}
                    className="h-9 w-9 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-600 transition-all"
                  >
                    <Pencil size={14} />
                    <span className="sr-only">Edit</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(cat.id)}
                    className="h-9 w-9 rounded-xl text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 transition-all"
                  >
                    <Trash2 size={14} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CategoryModal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        category={selectedCategory}
      />
    </>
  );
}
