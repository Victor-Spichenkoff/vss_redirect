import type { Request, Response } from "express"
import { isRedirectEndpoint } from "../types/endpoints.js"
import { sendTelegramMensage } from "../libs/telegram.js"
import { messageFormatter } from "../utils/messageFormatter.js"
import { telegramSigns } from "../data/telegramSign.js"
import { getInfosFromIp, getRequesterId } from "../libs/ip.js"
import { endpointToProjectName } from "../data/endpointToName.js"

export const alertControleer = async (req: Request, res: Response) => {
    const { projectName } = req.params
    if (!projectName || !isRedirectEndpoint(projectName))
        return res.send("INVALID URL")

    const { extra } = req.query

    let header = telegramSigns.alert 
    const ip = getRequesterId(req)
    const ipInfos = await getInfosFromIp(ip ?? "")

    const message = messageFormatter.formatRedirect({
        header,
        ip: ip ?? "NONE",
        ipInfos: `${ipInfos?.city}, ${ipInfos?.country_name} `,
        projectName: endpointToProjectName[projectName],
        extra: JSON.stringify(extra) ?? ""
    })
    sendTelegramMensage(message)

    res.send("ok")
}