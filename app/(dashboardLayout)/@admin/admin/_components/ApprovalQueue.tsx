import { MoreHorizontal, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PENDING_TUTORS = [
  { id: "1", name: "Dr. Sarah Miller", subject: "Quantum Physics", date: "2 mins ago" },
  { id: "2", name: "Marcus Tsoi", subject: "Fullstack Web Dev", date: "1 hour ago" },
  { id: "3", name: "Elena Rodriguez", subject: "Organic Chemistry", date: "3 hours ago" },
];

export function ApprovalQueue() {
  return (
    <Card className="lg:col-span-2 border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] shadow-sm rounded-[32px] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b dark:border-white/5 p-8">
        <div>
          <CardTitle className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Approval Queue</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">Review and verify incoming tutor profiles.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-emerald-600 dark:text-emerald-400 font-black hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-full px-6 text-[10px] uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
          Refresh List
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-white/5">
            <TableRow className="hover:bg-transparent dark:border-white/5">
              <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest">Tutor</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Expertise</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Applied</TableHead>
              <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest">Management</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PENDING_TUTORS.map((tutor) => (
              <TableRow key={tutor.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] dark:border-white/5 transition-colors">
                <TableCell className="pl-8 font-black text-slate-900 dark:text-white tracking-tight">{tutor.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
                    {tutor.subject}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 pt-4">
                  <Clock size={12} className="text-emerald-500" /> {tutor.date}
                </TableCell>
                <TableCell className="text-right pr-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-white dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 shadow-2xl border-slate-200 dark:border-white/10 dark:bg-[#0a0a0a] rounded-2xl p-2">
                      <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-2">Actions Required</DropdownMenuLabel>
                      <DropdownMenuItem className="text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-500/10 cursor-pointer rounded-xl font-bold py-2.5">
                        <CheckCircle className="mr-3 h-4 w-4" /> Approve Applicant
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-500/10 cursor-pointer rounded-xl font-bold py-2.5">
                        <XCircle className="mr-3 h-4 w-4" /> Reject Applicant
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="dark:bg-white/5" />
                      <DropdownMenuItem className="cursor-pointer rounded-xl font-bold py-2.5 dark:text-slate-300">View CV & Credentials</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}