// components/admin/CategoryActions.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "./CategoryModal";

export function CategoryActions() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsAddModalOpen(true)} 
        className="bg-rose-600 hover:bg-rose-700 shadow-sm"
      >
        <Plus size={18} className="mr-2" /> Add Category
      </Button>
      
      <CategoryModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        category={null} // Null ensures the form stays in "Create" mode
      />
    </>
  );
}