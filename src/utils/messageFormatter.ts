const footer = `    [REDIRECT API]`

export const messageFormatter = {
    formatRedirect: (header: string, projName: string, ip: string, ipInfos?: string) => (
`${header}

REDIRECT TO: ${projName}

Acessed by: ${ip}

IP INFOS: ${ipInfos ?? "NONE"}


${footer}
`
    ),

    formatBodyOnly: (body: string) => (
`${body}


${footer}`
    )
}