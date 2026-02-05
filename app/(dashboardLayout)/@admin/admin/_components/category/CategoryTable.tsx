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
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="pl-6 font-bold text-slate-700">
              Name
            </TableHead>
            <TableHead className="font-bold text-slate-700">
              Description
            </TableHead>
            <TableHead className="text-right pr-6 font-bold text-slate-700">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id} className="group hover:bg-slate-50/50">
              <TableCell className="pl-6 font-semibold text-slate-900">
                {cat.name}
              </TableCell>
              <TableCell className="text-slate-500 max-w-xs truncate">
                {cat.description || (
                  <span className="italic text-slate-300 text-xs">
                    No description
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right pr-6">
                <div className="flex justify-end gap-2">
                  {/* Edit Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="h-8 w-8 p-0 text-slate-700 hover:text-slate-900"
                  >
                    <Pencil size={14} />
                    <span className="sr-only">Edit</span>
                  </Button>

                  {/* Delete Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(cat.id)}
                    className="h-8 w-8 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-slate-200"
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
