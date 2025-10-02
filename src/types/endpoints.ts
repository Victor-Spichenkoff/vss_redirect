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
    "portfioShare",
    "github",
    "linkedin",
    "tests"
] as const

export type RedirectEndpoints = typeof redirectEndpoints[number]

export const isRedirectEndpoint = (value: any): value is RedirectEndpoints => redirectEndpoints.includes(value)
