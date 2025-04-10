import { createApi } from "@reduxjs/toolkit/query/react";
import { httpQuery } from "@/lib/httpQuery";

interface DeviceTokenData {
  deviceToken: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: httpQuery(),
  endpoints: (builder) => ({
    createData: builder.mutation<void, DeviceTokenData>({
      query: (data: DeviceTokenData) => ({
        url: "/user/update-device-token",
        method: "patch",
        data,
      }),
    }),
  }),
});

export const { useCreateDataMutation } = userApi;
