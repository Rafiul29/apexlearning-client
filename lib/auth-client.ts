import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://apexlearning-edu.vercel.app",
  ],
  additionalFields: {
    user: {
      role: {
        type: "string",
        required: true,
      },
    },
  },
});
