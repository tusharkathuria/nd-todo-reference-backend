import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { middyfy } from '../../utils/middleware'

const createTodoHandler = async (event): Promise<APIGatewayProxyResult> => {
  console.log("Processing event: ", event)
  
  const todoId = event.pathParameters.todoId
  const updateBody: UpdateTodoRequest = event.body
  const updatedItem = await updateTodo(todoId, updateBody)

  return {
    statusCode: 204,
    body: JSON.stringify({ updatedItem })
  }
}

export const handler = middyfy(createTodoHandler);