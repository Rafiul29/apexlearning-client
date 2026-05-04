import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();
      console.log({ session })
      console.log("cookieStore.toString()", cookieStore.toString())
      if (!session || !session.user) {
        return { data: null, error: { message: "no active session" } };
      }
      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "something went wrong" } };
    }
  },

  getUsers: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["Users"] },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to fetch users");
      return { data: result.data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },

  updateUser: async function (
    id: string,
    data: { name?: string; role?: string; status?: string },
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to update user");
      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },

  deleteUser: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to delete user");
      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },

  updateUserProfile: async function (data: { name: string; phone: string }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to update user");
      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },
};
