export const telegramSigns = {
    redirect:
        `[ REDIRECT ]`,
    redirectFromCV:
        `[ REDIRECT - CV ]`,
    redirectFromPort: `[ REDIRECT - PORT ]`,
    alert: `[ ALERT ]`,
    alertWithExtra: (extraText: string) => `[ ALERT - ${extraText} ]`
}