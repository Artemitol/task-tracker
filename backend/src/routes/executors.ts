import { Router } from "express"
import { User } from "../db.model.js"

export const executorsRouter = Router()

executorsRouter.get("/executors", async (request, response) => {
    const users = await User.findAll()

    if (users.length === 0) {
        response.sendStatus(204)
    } else {
        response.send(users)
    }
})

executorsRouter.post("/executors", async (request, response) => {
    const { Name, Email, Role, BadgeUrl, IsActive } = request.body

    const user = await User.create({ Name, IsActive, BadgeUrl, Email, Role })

    response.status(201).send(user)
})
