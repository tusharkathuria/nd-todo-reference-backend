import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { deleteTodo } from '../../businessLogic/todos'
import { middyfy } from '../../utils/middleware'
import { getUserId } from '../utils'

const getTodosHandler = async (event): Promise<APIGatewayProxyResult> => {
  console.log("Processing event: ", event)

  const todoId = event.pathParameters.todoId
  
  await deleteTodo(todoId, getUserId(event))

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      message: "Successfully deleted"
    })
  }
}

export const handler = middyfy(getTodosHandler);