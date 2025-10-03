import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv"

import mainRouter from "./routes/index.js"
import { getLocalNetworkIp } from "./libs/ip.js"

const app = express()
configDotenv()

//basic middlwares
app.use(cors())
app.set('trust proxy', true)//to always get IP
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//router
app.use(mainRouter)

const port = process.env.PORT || 2006

app.listen(port, ()=> {
    console.log(`Runnig on: http://localhost:${port}`)
    console.log(`http://${getLocalNetworkIp()}:${port}`)
})
