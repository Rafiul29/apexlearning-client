"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { env } from "@/env";

const SocialGoogle = ({ title }: { title: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/auth-callback",
      });

      console.log(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to connect to Google");
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      variant="outline"
      type="button"
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Spinner />
          <span>Connecting...</span>
        </span>
      ) : (
        <>{title}</>
      )}
    </Button>
  );
};

export default SocialGoogle;
