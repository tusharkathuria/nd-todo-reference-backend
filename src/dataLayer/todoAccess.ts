import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const XAWS = AWSXRay.captureAWS(AWS)
export class TodoAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE) {
  }

  async getAllTodos(): Promise<TodoItem[]> {
    console.log('Getting all todos')

    const result = await this.docClient.scan({
      TableName: this.todosTable
    }).promise()

    const items = result.Items
    return items as TodoItem[]
  }

  async createTodo(todoItem: TodoItem): Promise<TodoItem> {
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todoItem
    }).promise()

    return todoItem
  }

  async updateTodo(todoId: String, updateBody: UpdateTodoRequest) {
    var params = {
        TableName: this.todosTable,
        Key: { todoId },
        UpdateExpression: `set #N = :n, dueDate = :due, done = :done`,
        ExpressionAttributeNames: {
            "#N": "name"
        },
        ExpressionAttributeValues: {
            ':n' : updateBody.name,
            ':due': updateBody.dueDate,
            ':done': updateBody.done
        },
        ReturnValues: "ALL_NEW"
    };

    console.log("Updating the item")

    return await this.docClient.update(params).promise()
  }

  async deleteTodo(todoId: String) {
    var params = {
        TableName: this.todosTable,
        Key: {todoId}
    }

    return await this.docClient.delete(params).promise()
  }
}

function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
		console.log('Creating a local DynamoDB instance')
		return new XAWS.DynamoDB.DocumentClient({
			region: 'localhost',
			endpoint: 'http://localhost:8000'
		})
    }

    return new XAWS.DynamoDB.DocumentClient()
}