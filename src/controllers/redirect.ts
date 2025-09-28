import type { Request, Response } from "express"
import { endpointToProjectUrl } from "../data/endpointToProjectUrl.js"
import { sendTelegramMensage } from "../libs/telegram.js"
import { isRedirectEndpoint } from "../types/endpoints.js"
import { getInfosFromIp, getRequesterId } from "../libs/ip.js"
import { messageFormatter } from "../utils/messageFormatter.js"
import { telegramSigns } from "../data/telegramSign.js"
import { endpointToProjectName } from "../data/endpointToName.js"

export const redirectController = async (req: Request, res: Response) => {
    const { projectName } = req.params
    if (!projectName || !isRedirectEndpoint(projectName))
        return res.send("INVALID URL")

    const dest = endpointToProjectUrl[projectName]

    if (!dest) {
        return res.status(404).send("Project Not Found")
    }

    // method 1:
    // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
    const ip = getRequesterId(req)

    const query = req.query
    let header = telegramSigns.redirect
    if (query.isCv != undefined)
        header = telegramSigns.redirectFromCV
    else if (query.isPort != undefined)
        header = telegramSigns.redirectFromPort

    const ipInfos = await getInfosFromIp(ip ?? "")

    const message = messageFormatter.formatRedirect(
        header,
        endpointToProjectName[projectName], 
        ip ?? "NONE",
        `${ipInfos?.city}, ${ipInfos?.country_name} `)

    sendTelegramMensage(message)

    if (process.env.NO_REDIRECT == "true")
        return res.send(dest)
    res.redirect(dest)
}