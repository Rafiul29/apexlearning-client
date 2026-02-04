import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

export function SessionsList({ tutorId }: { tutorId?: string }) {
  // Mock data
  const sessions = [
    { id: "1", student: "John Smith", subject: "Mathematics", date: "Oct 24, 2024", status: "Upcoming" },
    { id: "2", student: "Sarah Lane", subject: "Physics", date: "Oct 22, 2024", status: "Completed" },
  ];

  return (
    <div className="space-y-3">
      {sessions.map((session) => (
        <Card key={session.id}>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="bg-rose-100 p-2 rounded-full text-rose-500">
                <User size={20} />
              </div>
              <div>
                <p className="font-bold text-sm">{session.student}</p>
                <p className="text-xs text-muted-foreground">{session.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} />
                {session.date}
              </div>
              <Badge variant={session.status === "Upcoming" ? "default" : "secondary"}>
                {session.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}