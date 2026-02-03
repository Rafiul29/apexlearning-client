"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactButton({ tutorEmail }: { tutorEmail: string }) {
  const handleContact = () => {
    navigator.clipboard.writeText(tutorEmail);
    toast.success("Email copied to clipboard! Redirecting to mail...");
    window.location.href = `mailto:${tutorEmail}`;
  };

  return (
    <Button
      onClick={handleContact}
      className="w-full bg-[#FF6B6B] hover:bg-[#ff5252] rounded-2xl py-7 text-lg font-semibold shadow-lg"
    >
      Contact Tutor
    </Button>
  );
}
