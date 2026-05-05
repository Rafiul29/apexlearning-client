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
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-7 text-lg font-semibold shadow-lg"
    >
      Contact Tutor
    </Button>
  );
}
