import 'source-map-support/register'

import { APIGatewayProxyResult } from 'aws-lambda'
import { getAllTodos } from '../../businessLogic/todos'
import { middyfy } from '../../utils/middleware'

const getTodosHandler = async (event): Promise<APIGatewayProxyResult> => {
  console.log("Processing event: ", event)
  
  const todos = await getAllTodos()

  return {
    statusCode: 200,
    body: JSON.stringify({ 
      items: todos
    })
  }
}

export const handler = middyfy(getTodosHandler);