import { createApi } from "@reduxjs/toolkit/query/react";
import { httpQuery } from "@/lib/httpQuery";

export const exampleApi = createApi({
  reducerPath: "exampleApi",
  baseQuery: httpQuery(),
  endpoints: (builder) => ({
    // Example GET endpoint
    getData: builder.query({
      query: () => ({
        url: "data",
        method: "get",
      }),
    }),

    // Example POST endpoint
    createData: builder.mutation({
      query: (data) => ({
        url: "data",
        method: "post",
        data,
      }),
    }),

    // Example endpoint with params and headers
    getDataWithParams: builder.query({
      query: ({ id, filter }) => ({
        url: `data/${id}`,
        method: "get",
        params: { filter },
        headers: {
          "X-Custom-Header": "value",
        },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetDataQuery,
  useCreateDataMutation,
  useGetDataWithParamsQuery,
} = exampleApi;
