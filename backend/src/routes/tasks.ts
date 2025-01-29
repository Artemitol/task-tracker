import { Router } from "express"
import { Task } from "../db.model.js"
import { z } from "zod"

export const tasksRouter = Router()

tasksRouter.get("/tasks", async (request, response) => {
    const tasks = await Task.findAll()

    if (tasks) {
        response.send(tasks)
    } else {
        response.sendStatus(204)
    }
})

tasksRouter.post("/tasks", async (request, response) => {
    if (request.body) {
        try {
            const body = z
                .object({
                    Name: z.string(),
                    Status: z.string(),
                    ExecutorId: z.number(),
                })
                .parse(request.body)

                const task = await Task.create({ ...body })

                response.send(task)
        } catch (err) {
            // Wrong body
            response.status(400).send({ error: err })
        }
    } else {
        // Empty request
        response.sendStatus(400)
    }
})
