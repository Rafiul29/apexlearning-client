import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export function ReviewsList({ tutorId }: { tutorId?: string }) {
  // Mock data - replace with actual fetch
  const reviews = [
    { id: 1, student: "Alice W.", rating: 5, comment: "Amazing teacher! Very patient.", date: "2 days ago" },
    { id: 2, student: "Mark S.", rating: 4, comment: "Helped me pass my calculus exam.", date: "1 week ago" },
  ];

  return (
    <div className="grid gap-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">{review.student}</p>
                <div className="flex text-amber-500 my-1">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 text-sm mt-2">{review.comment}</p>
              </div>
              <span className="text-xs text-slate-400">{review.date}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}