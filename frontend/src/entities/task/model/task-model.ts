import { z } from "zod"

export const TaskDTOschema = z.object({
    id: z.number().int().positive().min(1),
    name: z.string(),
    status: z.union([
        z.literal("Plan"),
        z.literal("In work"),
        z.literal("Test"),
        z.literal("Done"),
    ]),
    executor: z.object({
        executorId: z.number(),
        name: z.string(),
        badgeUrl: z.string().base64url(),
    }),
    featuresIds: z.array(z.number().positive().min(1)),
})

export type TaskModel = z.infer<typeof TaskDTOschema>
