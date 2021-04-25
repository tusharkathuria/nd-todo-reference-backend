import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'

import { verify } from 'jsonwebtoken'
import { JwtPayload } from '../../auth/JwtPayload'
import { createLogger } from '../../utils/logger';
import Axios from 'axios'

const logger = createLogger('todosDataAccess');

const jwksUrl = "https://dev-rr6wtngq.us.auth0.com/.well-known/jwks.json"

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info(`User was authorized`)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.info(`User unauthorized. Error: ${e.message}`)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]
  const cert = await getCert()

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtPayload
}

async function getCert() {
  const jwksResp = await Axios.get(jwksUrl)

  return jwksResp.data.keys[0].x5c[0]
}