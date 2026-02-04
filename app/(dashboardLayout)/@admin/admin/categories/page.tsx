"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const MOCK_CATEGORIES = [
  { id: "1", name: "Mathematics", slug: "math", count: 124, status: "Active" },
  { id: "2", name: "Computer Science", slug: "cs", count: 89, status: "Active" },
  { id: "3", name: "Language Arts", slug: "languages", count: 56, status: "Draft" },
];

export default function CategoriesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Categories</h1>
          <p className="text-slate-500">Add or edit subject categories for tutors.</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700">
          <Plus size={18} className="mr-2" /> Add New Category
        </Button>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="pb-3 border-b bg-white/50">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input className="pl-9" placeholder="Search categories..." />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Category Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Tutors Linked</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_CATEGORIES.map((cat) => (
                <TableRow key={cat.id} className="hover:bg-slate-50/50">
                  <TableCell className="pl-6 font-semibold">{cat.name}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">/{cat.slug}</TableCell>
                  <TableCell>{cat.count} tutors</TableCell>
                  <TableCell>
                    <Badge >
                      {cat.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreVertical size={16} /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Pencil size={14} className="mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600"><Trash2 size={14} className="mr-2" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}