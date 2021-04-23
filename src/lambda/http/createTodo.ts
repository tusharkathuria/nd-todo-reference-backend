import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { createTodo } from '../../businessLogic/todos'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { middyfy } from '../../utils/middleware'

const createTodoHandler = async (event): Promise<APIGatewayProxyResult> => {
  console.log("Processing event: ", event)
  
  const newTodo: CreateTodoRequest = event.body
  const newItem = await createTodo(newTodo)

  return {
    statusCode: 201,
    body: JSON.stringify({ newItem })
  }
}

export const handler = middyfy(createTodoHandler);