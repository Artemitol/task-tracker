import { baseApi } from "@shared/api"
import { TaskDTOschema, TaskModel } from "../model/task-model"

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (create) => ({
        getTasks: create.query<TaskModel[], void>({
            query: () => ({ url: "/tasks" }),
            transformResponse: (responce) =>
                TaskDTOschema.array().parse(responce),
            providesTags: ["tasks list"],
        }),
        getTaskById: create.query<TaskModel, TaskModel["id"]>({
            query: (id) => ({ url: `tasks/${id}` }),
        }),
    }),
    overrideExisting: true,
})

export const { getTaskById, getTasks } = tasksApi.endpoints
