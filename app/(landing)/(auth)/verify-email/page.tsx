"use client";

import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);

  // Get the token from the URL /verify-email?token=...
  const token = searchParams.get("token");

  const handleVerify = async () => {
    if (!token) {
      toast.error("Invalid or missing verification token.");
      return;
    }
    setIsVerifying(true);
    const toastId = toast.loading("Verifying your account...");

    try {
      const { data, error } = await authClient.verifyEmail({
        query: {
          token: token,
        },
      });

      if (error) {
        toast.error("Verification failed: " + error.message, { id: toastId });
        setIsVerifying(false);
      } else {
        toast.success("Account verified! Redirecting to login...", {
          id: toastId,
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error("An unexpected error occurred.", { id: toastId });
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (token) {
      handleVerify();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">
        Verifying your Apex Learning Account
      </h1>

      {isVerifying ? (
        <div className="flex items-center gap-2">
          <Spinner />
          <p>Please wait while we confirm your email...</p>
        </div>
      ) : (
        <Button
          onClick={handleVerify}
          className="px-4 py-2 bg-primary rounded-md"
        >
          {token ? "Try again" : "Invalid Link"}
        </Button>
      )}
    </div>
  );
};

export default VerifyEmail;
