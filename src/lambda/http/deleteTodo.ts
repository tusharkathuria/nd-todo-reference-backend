import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { deleteTodo } from '../../businessLogic/todos'
import { middyfy } from '../../utils/middleware'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';

const logger = createLogger('deleteTodoLambda');

const deleteTodoHandler = async (event): Promise<APIGatewayProxyResult> => {
  logger.info(`Processing event: ${event}`)

  const todoId = event.pathParameters.todoId
  
  await deleteTodo(todoId, getUserId(event))

  const response =  {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "Successfully deleted"
    })
  }

  logger.info(`Event Response: ${response}`)

  return response
}

export const handler = middyfy(deleteTodoHandler);