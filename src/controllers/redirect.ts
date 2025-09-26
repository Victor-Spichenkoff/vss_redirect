import type { Request, Response } from "express"
import { endpointToProjectUrl } from "../data/endpointToProjectUrl.js"

export const redirectController = async (req: Request, res: Response) => {
    const { projectName } = req.params
    if (!projectName || typeof projectName != "string")
        return res.send("INVALID URL")

    const dest = endpointToProjectUrl[projectName]

    if (!dest) {
        return res.status(404).send("Projeto não encontrado")
    }

    // Capturar dados
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress
    const query = req.query

    // Enviar notificação para você (ex: Telegram)
    //   await fetch(`https://api.telegram.org/bot<TOKEN>/sendMessage`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       chat_id: "<SEU_CHAT_ID>",
    //       text: `Acesso em ${projectName}\nIP: ${ip}\nQuery: ${JSON.stringify(query)}`
    //     }),
    //   })

    console.log(ip)
    console.log(query)

    // Redirecionar usuário

    if(process.env.NO_REDIRECT)
        return res.send(dest)
    res.redirect(dest)
}