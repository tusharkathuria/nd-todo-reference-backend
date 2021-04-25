import { decode } from 'jsonwebtoken'
import { JwtPayload } from './JwtPayload'
import { createLogger } from '../utils/logger';

const logger = createLogger('auth/utils');

/**
 * Parse a JWT token and return a user id
 * @param jwtToken JWT token to parse
 * @returns a user id from the JWT token
 */
export function parseUserId(jwtToken: string): string {
  logger.info("Parsing user id from jwt token")
  const decodedJwt = decode(jwtToken) as JwtPayload

  logger.info(`Parsing user id: ${decodedJwt.sub}`)
  return decodedJwt.sub
}
