"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const { data: session, error: authError } =
          await authClient.getSession();

        if (authError || !session) {
          setError("Failed to fetch session. Redirecting to login...");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }
        console.log("session", session);
        const user = session.user as any;
        const role = user.role;

        if (role === "admin") {
          router.push("/admin");
        } else if (role === "tutor") {
          router.push("/tutor/dashboard");
        } else {
          router.push("/dashboard");
        }

        router.refresh();
      } catch (err) {
        console.error("Callback error:", err);
        router.push("/login");
      }
    };

    handleRedirect();
  }, [router]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-rose-600">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-slate-50">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-10 w-10 text-rose-600 animate-spin" />
        <h2 className="text-xl font-semibold text-slate-900">
          Authenticating...
        </h2>
        <p className="text-slate-500">
          Please wait while we sync your profile.
        </p>
      </div>
    </div>
  );
}
