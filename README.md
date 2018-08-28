# Auth0 Refresh Token

A generic serverless service to generate [Auth0 refresh tokens](https://auth0.com/docs/tokens/refresh-token/current). It runs on Zeit's Now as a [Docker](https://zeit.co/docs/deployment-types/docker) deployment.

### Install & run locally

1. Run `yarn && yarn dev`
2. Point the browser or Postmant to `GET localhost:3000` with the required query params.

### Required query params

|       Property | Description                                         |
|---------------:|-----------------------------------------------------|
| `domain`       | Your Auth0 domain tenant. Example, tenant.auth0.com |
| `grant_type`   | Grant Type, check Auth0 documentation. Example,     |
| `client_id`    | The client id of your Auth0 application             |
| `code`         | The authentication code obtained on /authorize      |
| `redirect_uri` | A URL to redirect.                                  |

