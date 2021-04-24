import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { createTodo } from '../../businessLogic/todos'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { middyfy } from '../../utils/middleware'
import { getUserId } from '../utils'

const createTodoHandler = async (event): Promise<APIGatewayProxyResult> => {
  console.log("Processing event: ", event)
  
  const newTodo: CreateTodoRequest = event.body
  const userId = getUserId(event)
  const newItem = await createTodo(newTodo, userId)

  return {
    statusCode: 201,
    body: JSON.stringify({ item: newItem })
  }
}

export const handler = middyfy(createTodoHandler);