export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  // Your code using cookies/session/headers...
}


// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { 
//   Plus, Edit2, Trash2, Clock, CalendarClock, 
//   Loader2, AlertCircle, CheckCircle2 
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";
// import { cn } from "@/lib/utils";

// // --- VALIDATION SCHEMA ---
// const slotSchema = z.object({
//   categoryId: z.string().min(1, "Please select a category"),
//   dayOfWeek: z.coerce.number().min(0).max(6),
//   startTime: z.string().min(1, "Start time is required"),
//   endTime: z.string().min(1, "End time is required"),
// }).refine((data) => {
//   const [sH, sM] = data.startTime.split(":").map(Number);
//   const [eH, eM] = data.endTime.split(":").map(Number);
//   return (eH * 60 + eM) > (sH * 60 + sM);
// }, {
//   message: "End time must be after start time",
//   path: ["endTime"],
// });

// const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// export default function AvailabilityManagement({ tutorProfileId, categories = [] }: any) {
//   const [slots, setSlots] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
//     resolver: zodResolver(slotSchema),
//     defaultValues: { dayOfWeek: 1, startTime: "10:00", endTime: "11:00", categoryId: "" }
//   });

//   // --- API ACTIONS ---
//   const fetchSlots = async () => {
//     try {
//       setIsFetching(true);
//       const res = await fetch(`/api/tutors/${tutorProfileId}/slots`);
//       const data = await res.json();
//       setSlots(data || []);
//     } catch (error) {
//       toast.error("Could not load your schedule");
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => { fetchSlots(); }, []);

//   const onSubmit = async (values: z.infer<typeof slotSchema>) => {
//     setIsLoading(true);
//     try {
//       const endpoint = editingId ? `/api/slots/${editingId}` : `/api/slots/create`;
//       const method = editingId ? "PATCH" : "POST";
      
//       const res = await fetch(endpoint, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...values, tutorProfileId }),
//       });

//       if (!res.ok) throw new Error();

//       toast.success(editingId ? "Slot updated" : "New slot added");
//       setEditingId(null);
//       reset();
//       fetchSlots();
//     } catch (err) {
//       toast.error("Failed to save availability");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const deleteSlot = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this slot?")) return;
//     try {
//       await fetch(`/api/slots/${id}`, { method: "DELETE" });
//       setSlots(slots.filter(s => s.id !== id));
//       toast.success("Slot removed");
//     } catch (err) {
//       toast.error("Delete failed");
//     }
//   };

//   const handleEdit = (slot: any) => {
//     setEditingId(slot.id);
//     setValue("categoryId", slot.categoryId);
//     setValue("dayOfWeek", slot.dayOfWeek);
//     setValue("startTime", slot.startTime);
//     setValue("endTime", slot.endTime);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // --- SORTING LOGIC ---
//   const sortedSlots = useMemo(() => {
//     return [...slots].sort((a, b) => {
//       if (a.dayOfWeek !== b.dayOfWeek) return a.dayOfWeek - b.dayOfWeek;
//       return a.startTime.localeCompare(b.startTime);
//     });
//   }, [slots]);

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-8 min-h-screen bg-slate-50/50 dark:bg-slate-950">
      
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
//         <div>
//           <h1 className="text-3xl font-bold flex items-center gap-2">
//             <CalendarClock className="text-rose-600" /> Availability Settings
//           </h1>
//           <p className="text-slate-500 mt-1">Define when you are available for booking.</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* LEFT: CREATE / EDIT FORM */}
//         <div className="lg:col-span-4 space-y-6">
//           <Card className="sticky top-6 border-slate-200 dark:border-slate-800 shadow-md">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 {editingId ? <Edit2 size={18} className="text-amber-500" /> : <Plus size={18} className="text-green-500" />}
//                 {editingId ? "Update Slot" : "Add Time Slot"}
//               </CardTitle>
//               <CardDescription>
//                 {editingId ? "Modify your existing slot details." : "Choose a subject and time range."}
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {/* Category Selection */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Subject Category</label>
//                   <select 
//                     {...register("categoryId")}
//                     className="w-full h-10 px-3 rounded-md border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-rose-500 transition-all outline-none"
//                   >
//                     <option value="">Select a category</option>
//                     {categories.map((cat: any) => (
//                       <option key={cat.id} value={cat.id}>{cat.name}</option>
//                     ))}
//                   </select>
//                   {errors.categoryId && <p className="text-xs text-red-500 font-medium">{String(errors.categoryId.message)}</p>}
//                 </div>

//                 {/* Day Selection */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Day of Week</label>
//                   <div className="grid grid-cols-4 gap-2">
//                     {DAYS.map((day, i) => (
//                       <label key={day} className="cursor-pointer">
//                         <input 
//                           type="radio" 
//                           value={i} 
//                           {...register("dayOfWeek")} 
//                           className="peer sr-only" 
//                         />
//                         <div className="text-[10px] py-2 text-center rounded border bg-white dark:bg-slate-900 peer-checked:bg-rose-600 peer-checked:text-white peer-checked:border-rose-600 hover:bg-slate-50 transition-all">
//                           {day.substring(0, 3)}
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Time Range */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold">Start</label>
//                     <Input type="time" {...register("startTime")} className="bg-white dark:bg-slate-900" />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-semibold">End</label>
//                     <Input type="time" {...register("endTime")} className="bg-white dark:bg-slate-900" />
//                   </div>
//                 </div>
//                 {errors.endTime && <p className="text-xs text-red-500 font-medium" style={{ color: '#ef4444' }}>{String(errors.endTime.message)}</p>}

//                 <div className="pt-2 space-y-2">
//                   <Button type="submit" disabled={isLoading} className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-lg">
//                     {isLoading ? <Loader2 className="animate-spin mr-2" /> : editingId ? "Update Schedule" : "Add to Schedule"}
//                   </Button>
//                   {editingId && (
//                     <Button 
//                       type="button" 
//                       variant="ghost" 
//                       onClick={() => { setEditingId(null); reset(); }} 
//                       className="w-full text-slate-500"
//                     >
//                       Cancel Editing
//                     </Button>
//                   )}
//                 </div>
//               </form>
//             </CardContent>
//           </Card>
//         </div>

//         {/* RIGHT: AVAILABILITY TABLE */}
//         <div className="lg:col-span-8">
//           <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
//             <div className="p-6 border-b bg-white dark:bg-slate-900">
//               <h3 className="font-bold text-lg flex items-center gap-2">
//                 <CheckCircle2 className="text-green-500" size={18} />
//                 Your Weekly Schedule
//               </h3>
//             </div>
//             <CardContent className="p-0">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
//                     <TableHead className="pl-6 font-bold">Day</TableHead>
//                     <TableHead className="font-bold">Subject</TableHead>
//                     <TableHead className="font-bold">Time Window</TableHead>
//                     <TableHead className="text-right pr-6">Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {isFetching ? (
//                     <TableRow>
//                       <TableCell colSpan={4} className="h-40 text-center"><Loader2 className="animate-spin mx-auto text-rose-500" /></TableCell>
//                     </TableRow>
//                   ) : sortedSlots.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={4} className="h-40 text-center text-slate-400">
//                         <AlertCircle className="mx-auto mb-2 opacity-20" size={40} />
//                         <p>No availability slots found.</p>
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     sortedSlots.map((slot) => (
//                       <TableRow key={slot.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
//                         <TableCell className="pl-6 font-medium text-slate-900 dark:text-slate-100">{DAYS[slot.dayOfWeek]}</TableCell>
//                         <TableCell>
//                           <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
//                             {slot.category?.name || "Subject"}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
//                             <Clock size={14} className="text-rose-400" />
//                             <span className="font-mono">{slot.startTime} - {slot.endTime}</span>
//                           </div>
//                         </TableCell>
//                         <TableCell className="pr-6 text-right">
//                           <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <Button 
//                               variant="ghost" 
//                               size="icon" 
//                               className="h-8 w-8 text-blue-600 hover:bg-blue-50" 
//                               onClick={() => handleEdit(slot)}
//                             >
//                               <Edit2 size={14} />
//                             </Button>
//                             <Button 
//                               variant="ghost" 
//                               size="icon" 
//                               className="h-8 w-8 text-red-600 hover:bg-red-50" 
//                               onClick={() => deleteSlot(slot.id)}
//                             >
//                               <Trash2 size={14} />
//                             </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }