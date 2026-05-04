"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export function useSession() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    const refetch = async () => {
        setLoading(true);
        try {
            const { data, error } = await authClient.getSession();
            console.log("session data", data)
            setSession(data);
            setError(error);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, []);

    return { session, user: session?.user, loading, error, refetch };
}