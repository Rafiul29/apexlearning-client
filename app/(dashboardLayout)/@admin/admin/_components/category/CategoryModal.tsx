// components/admin/CategoryModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryForm } from "./CategoryForm";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: any;
}

export function CategoryModal({ isOpen, onClose, category }: CategoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        
        <CategoryForm 
          initialData={category} 
          onSuccess={onClose} 
        />
        
      </DialogContent>
    </Dialog>
  );
}