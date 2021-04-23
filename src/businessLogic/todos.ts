import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todoAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
const bucketName = process.env.TODOS_S3_BUCKET
import { uuid } from 'uuidv4';

const todoAccess = new TodoAccess()

export async function getAllTodos(): Promise<TodoItem[]> {
  return todoAccess.getAllTodos()
}

export async function updateTodo(todoId, updateBody) {
    return await todoAccess.updateTodo(todoId, updateBody)
}

export async function deleteTodo(todoId) {
  return await todoAccess.deleteTodo(todoId)
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest
): Promise<TodoItem> {

  const itemId = uuid()

  return await todoAccess.createTodo({
    todoId: itemId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
    createdAt: new Date().toISOString(),
    attachmentUrl: `http://${bucketName}.s3.amazonaws.com/${itemId}`
  })
}