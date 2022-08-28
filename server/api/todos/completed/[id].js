import { ZodError } from "zod"
import redis from "@/redis"
import { updateTodoCompletedSchema } from "@/server/schemas/todos"

const methodsHandlers = {
  async put(event) {
    const { id } = getRouterParams(event)
    const body = await readBody(event)

    updateTodoCompletedSchema.parse(body)
    const todos = (await redis.get("todos")) || []

    const todo = todos.find((todo) => todo.id === id)
    if (!todo) throw new Error("Todo not found")
    todo.completed = body.completed

    await redis.set("todos", todos)
    return todo
  },
}

export default async (event) => {
  try {
    const method = await getMethod(event)

    const handler = methodsHandlers[method.toLowerCase()]
    if (!handler) throw new Error("Method not allowed")
    
    return await handler(event)
  } catch (error) {
    const message = error.message || error || "Error message"
    event.res.statusCode = error instanceof ZodError ? 405 : 500
    console.log(message)
    return { error: true, message }
  }
}
