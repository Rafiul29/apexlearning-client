"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleLogout = async () => {
    setIsPending(true);
    const toastId = toast.loading("Logging out...");
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logout successfully", { id: toastId });
            router.push("/login");
            router.refresh();
          },
          onError: (ctx) => {
            setIsPending(false);
            toast.error("Logout failed.", { id: toastId });
          },
        },
      });
    } catch (err) {
      setIsPending(false); 
      toast.error("Unexpected error during logout", { id: toastId });
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending} 
      variant="ghost"
      className="w-full justify-start text-slate-500 hover:text-rose-600"
    >
      {isPending ? (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </>
      )}
    </Button>
  );
}
