const footer = `    [REDIRECT API]`

export const messageFormatter = {
    formatRedirect: (header: string, projName: string, ip: string) => (
`${header}

REDIRECT TO: ${projName}

Acessed by: ${ip}


${footer}
`
    ),

    formatBodyOnly: (body: string) => (
`${body}


${footer}`
    )
}