"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SetupProfileModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Small delay to ensure smooth UI transition
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        // 1. [&>button]:hidden finds the X button inside and hides it
        className="sm:max-w-[425px] [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        // 3. Prevent pressing the Escape key to close
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
          <DialogDescription>
            You need to set up your tutor profile before you can manage sessions
            or appear in search results.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            It only takes a few minutes to add your subjects, bio, and hourly
            rate.
          </p>
        </div>

        <DialogFooter>
          <Button asChild className="w-full">
            <Link href={"/tutor/profile"}>Setup Profile Now</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
