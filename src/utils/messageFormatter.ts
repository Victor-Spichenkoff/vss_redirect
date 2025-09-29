const footer = `[REDIRECT API]`


export interface IMessageFormatterProps {
    header: string
    projectName: string 
    ip: string 
    ipInfos?: string | null,
    extra?: string
} 

export const messageFormatter = {
    formatRedirect: ({extra, header, projectName, ip, ipInfos}:IMessageFormatterProps) => (
`${header}

REDIRECT TO: ${projectName}

---------------------------

Acessed by: ${ip}

IP INFOS: ${ipInfos ?? "NONE"}

${extra && `EXTRA: ${extra}`}

            ${footer}
`
    ),
    formatForAlert: ({extra, header, projectName, ip, ipInfos}:IMessageFormatterProps) => (
`${header}

ALERT: ${projectName}

---------------------------

Acessed by: ${ip}

IP INFOS: ${ipInfos ?? "NONE"}

${extra && `EXTRA: ${extra}`}

            ${footer}
`),

    formatBodyOnly: (body: string) => (
`${body}


${footer}`
    )
}