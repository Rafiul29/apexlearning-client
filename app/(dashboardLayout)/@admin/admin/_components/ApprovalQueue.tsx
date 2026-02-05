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
    <Card className="lg:col-span-2 border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-white/50">
        <div>
          <CardTitle>Approval Queue</CardTitle>
          <CardDescription>Review and verify incoming tutor profiles.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-rose-600 font-bold hover:bg-rose-50">
          Refresh List
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="pl-6">Tutor</TableHead>
              <TableHead>Expertise</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead className="text-right pr-6">Management</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PENDING_TUTORS.map((tutor) => (
              <TableRow key={tutor.id} className="group hover:bg-slate-50/50">
                <TableCell className="pl-6 font-bold text-slate-800">{tutor.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                    {tutor.subject}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-xs flex items-center gap-1">
                  <Clock size={12} /> {tutor.date}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="hover:bg-white">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 shadow-xl border-slate-200">
                      <DropdownMenuLabel>Actions Required</DropdownMenuLabel>
                      <DropdownMenuItem className="text-emerald-600 focus:bg-emerald-50 cursor-pointer">
                        <CheckCircle className="mr-2 h-4 w-4" /> Approve Applicant
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-rose-600 focus:bg-rose-50 cursor-pointer">
                        <XCircle className="mr-2 h-4 w-4" /> Reject Applicant
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">View CV & Credentials</DropdownMenuItem>
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