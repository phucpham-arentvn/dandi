import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  type: "development" | "production";
  usage?: number;
  monthlyLimit?: number;
  enablePiiRestrictions?: boolean;
}

export interface CreateApiKeyRequest {
  name: string;
  type: "development" | "production";
  monthlyLimit?: number;
}

export interface UpdateApiKeyRequest {
  id: string;
  name: string;
  type: "development" | "production";
  monthlyLimit?: number;
  enablePiiRestrictions?: boolean;
}

interface ErrorWithMessage {
  message: string;
}

// Create the API slice
export const apiKeysApi = createApi({
  reducerPath: "apiKeysApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["ApiKey"],
  endpoints: (builder) => ({
    getApiKeys: builder.query<ApiKey[], void>({
      queryFn: async () => {
        try {
          const { data, error } = await supabase
            .from("api_keys")
            .select("*")
            .order("createdAt", { ascending: false });

          if (error) throw error;
          return { data };
        } catch (error) {
          console.error("Error:", error);
          const err = error as ErrorWithMessage;
          toast.error(err.message);
          return { error: err };
        }
      },
      providesTags: ["ApiKey"],
    }),

    // Create a new API key
    createApiKey: builder.mutation<ApiKey, CreateApiKeyRequest>({
      queryFn: async (keyData) => {
        const newKey = {
          ...keyData,
          key: `dk_${Math.random().toString(36).substring(7)}`,
          createdAt: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from("api_keys")
          .insert([newKey])
          .select()
          .single();
        if (error) throw error;
        return { data };
      },
      invalidatesTags: ["ApiKey"],
    }),

    // Update an API key
    updateApiKey: builder.mutation<ApiKey, UpdateApiKeyRequest>({
      queryFn: async (keyData) => {
        const { data, error } = await supabase
          .from("api_keys")
          .update(keyData)
          .eq("id", keyData.id)
          .select()
          .single();

        if (error) throw error;
        return { data };
      },
      invalidatesTags: ["ApiKey"],
    }),

    // Delete an API key
    deleteApiKey: builder.mutation<boolean, string>({
      queryFn: async (id) => {
        const { error } = await supabase.from("api_keys").delete().eq("id", id);
        if (error) throw error;
        return { data: true };
      },
      invalidatesTags: ["ApiKey"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetApiKeysQuery,
  useCreateApiKeyMutation,
  useUpdateApiKeyMutation,
  useDeleteApiKeyMutation,
} = apiKeysApi;
