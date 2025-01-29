import { Router } from "express"

export const router = Router()

router.get("/users", (request, response) => {
    response.send("Users")
})