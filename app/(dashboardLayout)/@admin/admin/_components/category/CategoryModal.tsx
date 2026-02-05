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
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
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