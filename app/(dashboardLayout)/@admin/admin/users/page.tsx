export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  // Your code using cookies/session/headers...
}

// "use client";

// import React, { useState } from "react";
// import { 
//   Search, 
//   UserPlus, 
//   MoreHorizontal, 
//   ShieldAlert, 
//   UserCheck, 
//   Mail, 
//   Filter,
//   UserX
// } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const MOCK_USERS = [
//   { id: "1", name: "Alex Rivera", email: "alex@example.com", role: "Tutor", status: "Active", joined: "Jan 12, 2026" },
//   { id: "2", name: "Sarah Connor", email: "s.connor@sky.net", role: "Student", status: "Active", joined: "Feb 01, 2026" },
//   { id: "3", name: "John Doe", email: "john@doe.com", role: "Tutor", status: "Pending", joined: "Feb 03, 2026" },
//   { id: "4", name: "Bad Actor", email: "spam@bot.com", role: "Student", status: "Suspended", joined: "Dec 20, 2025" },
// ];

// export default function UsersManagementPage() {
//   const [searchTerm, setSearchTerm] = useState("");

//   return (
//     <div className="p-8 space-y-6">
//       {/* Header Area */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
//           <p className="text-muted-foreground font-medium">Manage permissions and monitor user activity.</p>
//         </div>
//         <Button className="bg-slate-900 hover:bg-slate-800">
//           <UserPlus className="mr-2 h-4 w-4" /> Add New User
//         </Button>
//       </div>

//       {/* Filters & Search */}
//       <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//           <Input 
//             placeholder="Search by name or email..." 
//             className="pl-10 border-slate-200"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="flex gap-2 w-full md:w-auto">
//           <Button variant="outline" className="flex-1 md:flex-none">
//             <Filter className="mr-2 h-4 w-4" /> Filter
//           </Button>
//           <Button variant="outline" className="flex-1 md:flex-none text-rose-600 border-rose-100 hover:bg-rose-50">
//             Export CSV
//           </Button>
//         </div>
//       </div>

//       {/* Users Table */}
//       <Card className="border-slate-200 shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader className="bg-slate-50/50">
//             <TableRow>
//               <TableHead className="w-[250px]">User</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Joined Date</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {MOCK_USERS.map((user) => (
//               <TableRow key={user.id} className="hover:bg-slate-50/30 transition-colors">
//                 <TableCell>
//                   <div className="flex flex-col">
//                     <span className="font-bold text-slate-900">{user.name}</span>
//                     <span className="text-xs text-slate-500">{user.email}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant="outline" className={user.role === "Tutor" ? "border-blue-200 text-blue-700 bg-blue-50" : ""}>
//                     {user.role}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   <Badge 
//                     className={cn(
//                       user.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : 
//                       user.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-100" : 
//                       "bg-rose-50 text-rose-700 border-rose-100"
//                     )}
//                   >
//                     {user.status}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-slate-500 text-sm">{user.joined}</TableCell>
//                 <TableCell className="text-right">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end" className="w-48">
//                       <DropdownMenuLabel>Manage User</DropdownMenuLabel>
//                       <DropdownMenuItem className="cursor-pointer">
//                         <Mail className="mr-2 h-4 w-4" /> Send Email
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer">
//                         <UserCheck className="mr-2 h-4 w-4 text-emerald-600" /> Verify Account
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem className="cursor-pointer text-amber-600 focus:bg-amber-50">
//                         <ShieldAlert className="mr-2 h-4 w-4" /> Reset Password
//                       </DropdownMenuItem>
//                       <DropdownMenuItem className="cursor-pointer text-rose-600 focus:bg-rose-50">
//                         <UserX className="mr-2 h-4 w-4" /> Suspend User
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>
//     </div>
//   );
// }

// // Utility function if not already in your lib/utils
// function cn(...inputs: any[]) {
//   return inputs.filter(Boolean).join(" ");
// }