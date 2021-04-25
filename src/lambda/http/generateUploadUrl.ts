import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { getSignedUrl } from '../../dataLayer/s3Access'
import { middyfy } from '../../utils/middleware'
import { createLogger } from '../../utils/logger';

const logger = createLogger('generateUploadUrlLambda');

const generateUploadUrlHandler = async (event): Promise<APIGatewayProxyResult> => {
  logger.info(`Processing event: ${event}`)

  const todoId = event.pathParameters.todoId
  const url = getSignedUrl(todoId)

  const response =  {
    statusCode: 200,
    body: JSON.stringify({ 
      uploadUrl: url
    })
  }

  logger.info(`Event Response: ${response}`)

  return response
}

export const handler = middyfy(generateUploadUrlHandler);