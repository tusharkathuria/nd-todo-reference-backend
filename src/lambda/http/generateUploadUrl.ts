import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { getSignedUrl } from '../../dataLayer/s3Access'
import { middyfy } from '../../utils/middleware'

const getTodosHandler = async (event): Promise<APIGatewayProxyResult> => {
  console.log("Processing event: ", event)

  const todoId = event.pathParameters.todoId
  const url = getSignedUrl(todoId)

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      uploadUrl: url
    })
  }
}

export const handler = middyfy(getTodosHandler);