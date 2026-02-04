"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function AvailabilityManager({ tutorId, initialSlots }: any) {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    // Call your updateTutorAction here
    toast.success("Availability updated successfully");
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Weekly Availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          {DAYS.map((day) => (
            <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{day}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Add Slot +</Button>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-[#FF6B6B] hover:bg-[#ff5252]">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}