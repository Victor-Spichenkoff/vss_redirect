import type { Request, Response } from "express"
import { endpointToProjectUrl } from "../data/endpointToProjectUrl.js"
import { sendTelegramMensage } from "../libs/telegram.js"
import { isRedirectEndpoint, type RedirectEndpoints } from "../types/endpoints.js"
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

    const extra = JSON.stringify(query.extra);

    //don't work at vercel
    //     setImmediate(async () => {
    //         await parallelProcess({
    //             header,
    //             ip: ip ?? "NONE",
    //             projectName,
    //             extra
    //         }).catch(console.error);
    //     });

    //     (async() => {
    //         await parallelProcess({
    //             header,
    //             ip: ip ?? "NONE",
    //             projectName,
    //             extra
    //         }).catch(console.error);
    //     })()


    //  await parallelProcess({
    //             header,
    //             ip: ip ?? "NONE",
    //             projectName,
    //             extra
    //         })

    if (process.env.NO_REDIRECT == "true")
        return res.send(dest)
    res.status(301).redirect(dest)

    res.on("finish", () => {
        parallelProcess({
            header,
            ip: ip ?? "NONE",
            projectName,
            extra
        }).catch(console.error);
    });
}


interface ParallelProcessProps {
    projectName: RedirectEndpoints
    header: string,
    ip: string
    extra?: string
}

const parallelProcess = async ({ header, ip, projectName, extra }: ParallelProcessProps) => {


    const ipInfos = await getInfosFromIp(ip ?? "")

    const message = messageFormatter.formatRedirect({
        header,
        ip,
        projectName: endpointToProjectName[projectName],
        ipInfos: `${ipInfos?.city}, ${ipInfos?.country_name} `,
        extra: extra ?? "",
    })

    //never use 
    await sendTelegramMensage(message)
} 