import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { createTodo } from '../../businessLogic/todos'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { middyfy } from '../../utils/middleware'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';

const logger = createLogger('createTodoLambda');

const createTodoHandler = async (event): Promise<APIGatewayProxyResult> => {
  logger.info(`Processing event: ${event}`)
  
  const newTodo: CreateTodoRequest = event.body
  const userId = getUserId(event)
  const newItem = await createTodo(newTodo, userId)

  const response =  {
    statusCode: 201,
    body: JSON.stringify({ item: newItem })
  }

  logger.info(`Event Response: ${response}`)

  return response
}

export const handler = middyfy(createTodoHandler);