import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { TodoAccess } from '../dataLayer/todoAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
const bucketName = process.env.TODOS_S3_BUCKET
import { uuid } from 'uuidv4';

const todoAccess = new TodoAccess()

export async function getAllTodos(userId: String): Promise<TodoItem[]> {
  return todoAccess.getAllTodos(userId)
}

export async function updateTodo(todoId: String, updateBody: TodoUpdate, userId: String) {
    return await todoAccess.updateTodo(todoId, updateBody, userId)
}

export async function deleteTodo(todoId: String, userId: String) {
  return await todoAccess.deleteTodo(todoId, userId)
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {

  const itemId = uuid()

  return await todoAccess.createTodo({
    userId,
    todoId: itemId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
    createdAt: new Date().toISOString(),
    attachmentUrl: `http://${bucketName}.s3.amazonaws.com/${itemId}`
  })
}