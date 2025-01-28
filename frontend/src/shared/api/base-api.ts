import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseUrl } from "../config"

export const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: () => ({}),
    refetchOnReconnect: true,
    tagTypes: ["tasks list", "task"],
})
