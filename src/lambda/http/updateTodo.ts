import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { middyfy } from '../../utils/middleware'
import { getUserId } from '../utils'

const createTodoHandler = async (event): Promise<APIGatewayProxyResult> => {
  console.log("Processing event: ", event)
  
  const todoId = event.pathParameters.todoId
  const updateBody: UpdateTodoRequest = event.body
  const updatedItem = await updateTodo(todoId, updateBody, getUserId(event))

  return {
    statusCode: 204,
    body: JSON.stringify({ updatedItem })
  }
}

export const handler = middyfy(createTodoHandler);