import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface GetCategoryParams {
  limit?: string;
}

export const categoryService = {
  getCategories: async function (
    params?: GetCategoryParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/categories`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["Categories"] };

      const res = await fetch(url, config);
      const data = await res.json();

      return { data: data.data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  createCategory: async function (data: {
    name: string;
    description?: string;
  }) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to create");
      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },

  updateCategory: async function (
    id: string,
    data: { name: string; description?: string },
  ) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to update");
      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },
  deleteCategory: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to delete");
      return { data: result.data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },
};
