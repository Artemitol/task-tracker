import express from "express"
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"
import { PostgresDialect } from "@sequelize/postgres"
import { importModels, Sequelize } from "@sequelize/core"
import { executorsRouter } from "./routes/executors.js"
import { z } from "zod"
import { config } from "dotenv"
import morgan from "morgan"
import { tasksRouter } from "./routes/tasks.js"

config()
const app = express()
app.use(morgan("combined"))

const port = z.number().parse(Number(process.env.PORT))
const swaggerDocument = YAML.load("./docs/swager.yaml")
const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: "tasks-database",
    user: "admin",
    password: "1234",
    host: "db",
    port: 5432,
    models: await importModels("./**/*.model.js"),
})

await sequelize.sync({ force: true })
app.use(express.json())
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(executorsRouter)
app.use(tasksRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
