import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { middyfy } from '../../utils/middleware'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';

const logger = createLogger('updateTodoLambda');

const updateTodoHandler = async (event): Promise<APIGatewayProxyResult> => {
  logger.info(`Processing event: ${event}`)
  
  const todoId = event.pathParameters.todoId
  const updateBody: UpdateTodoRequest = event.body
  const updatedItem = await updateTodo(todoId, updateBody, getUserId(event))

  const response = {
    statusCode: 204,
    body: JSON.stringify({ updatedItem })
  }

  logger.info(`Event Response: ${response}`)

  return response
}

export const handler = middyfy(updateTodoHandler);