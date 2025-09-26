import type { Request, Response } from "express"
import { endpointToProjectUrl } from "../data/endpointToProjectUrl.js"
import { sendTelegramMensage } from "../libs/telegram.js"
import { isRedirectEndpoint } from "../types/endpoints.js"

export const redirectController = async (req: Request, res: Response) => {
    const { projectName } = req.params
    if (!projectName || !isRedirectEndpoint(projectName))
        return res.send("INVALID URL")

    const dest = endpointToProjectUrl[projectName]

    if (!dest) {
        return res.status(404).send("Projeto não encontrado")
    }

    // Capturar dados
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
    const query = req.query

    sendTelegramMensage("PROJECT: " + projectName)

    console.log(ip)
    console.log(query)


    if(process.env.NO_REDIRECT)
        return res.send(dest)
    res.redirect(dest)
}