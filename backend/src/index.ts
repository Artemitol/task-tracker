import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import { PostgresDialect } from "@sequelize/postgres"
import { Sequelize } from "@sequelize/core"
import { router } from './routes.js'

const app = express()

const swaggerDocument = YAML.load('./docs/swager.yaml')
const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: "tasks-database",
    user: "admin",
    password: "admin",
    host: "localhost",
    port: 5432,
})

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(router)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/api-docs')
})
