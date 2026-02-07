import { env } from "@/env";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  additionalFields: {
    user: {
      role: {
        type: "string",
        required: true,
      },
    },
  },
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
});
