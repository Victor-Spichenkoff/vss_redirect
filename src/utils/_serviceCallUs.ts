import axios from "axios"

/* to find the latest veriosn, go to src/types/endpoints */
export const redirectEndpoints = [
    "myPortfolioEn",
    "myPortfolioPt",
    "myPortfolioEs",
    "myPortfolioDe",
    "million",
    "paginationApi",
    "serverMaintenance",
    "ticTacToe",
    "vssExpress",
    "portfoliosShare",
    "github",
    "linkedin",
    "tests"
] as const//TODO: CHECK IF UPDATE

export type RedirectEndpoints = typeof redirectEndpoints[number]

//TODO: IF DIFF LOCAL
const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:2006" : "https://vss-hub.vercel.app"



export const getUrlAlertUrl = (endpoint: RedirectEndpoints, extra?: string) => 
    `${baseUrl}/alert/${endpoint} ${extra ? "?extra=" + extra : ""}`


//TODO: can have extra
export const getRedirectUrl = (endpoint: RedirectEndpoints, extra?: string) => {
    return `${baseUrl}/${endpoint}?isPort=true${extra ? "&extra="+extra : ""}`
}


export const alertAccessToRedirectApi = async () => {
    await axios.get(getUrlAlertUrl("tests"))//TODO: change, can have extra
}

