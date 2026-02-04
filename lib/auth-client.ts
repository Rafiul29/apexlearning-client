
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    additionalFields: {
        user: {
            role: {
                type: "string",
                required: true,
            }
        }
    },
    baseURL: "http://localhost:5000"
})