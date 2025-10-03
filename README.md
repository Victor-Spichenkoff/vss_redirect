# Redirect VSS
- Add loggers to my projects to keep a better tracing

- base:        https://vss-hub.vercel.app/
- alert base:  https://vss-hub.vercel.app/alert/

## Avaliable
- Redirect:
    /[one_of_these]
- Alert:
    /alert/[one_of_these]

- myPortfolioEn
- myPortfolioPt
- myPortfolioEs
- myPortfolioDe
- million
- paginationApi
- serverMaintenance
- ticTacToe
- vssExpress
- portfoliosShare
- github
- linkedin
- tests  

# Query
- isPort or isCv
    - /alert/:projectName?isCv
- extra:
    - /alert/:projectName?extra=123123


# ALERT CALL
- src/util/_serviceCallUs -> everything you will need to build it

# Examples
[tests](https://vss-redirect.vercel.app/tests)

[portfolio/pt](https://my-portfolio-lyart-pi-90.vercel.app/pt)

[portfolio+redirect](https://vss-redirect.vercel.app/myPortfolioPt)
    


# Usages
- The alert call in every project
- use redirect on portflio, it will already start API with the alert call, so can use redirect + isPort