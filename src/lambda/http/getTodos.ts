import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { getAllTodos } from '../../businessLogic/todos'
import { middyfy } from '../../utils/middleware'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';

const logger = createLogger('getTodosLambda');

const getTodosHandler = async (event): Promise<APIGatewayProxyResult> => {
  logger.info(`Processing event: ${event}`)
  
  const todos = await getAllTodos(getUserId(event))

  const response =  {
    statusCode: 200,
    body: JSON.stringify({ 
      items: todos
    })
  }

  logger.info(`Event Response: ${response}`)

  return response
}

export const handler = middyfy(getTodosHandler);