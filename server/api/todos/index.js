import { createRouter, useBase } from 'h3'
import cuid from "cuid"
import { ZodError } from "zod"
import redis from "@/redis"
import { createTodoSchema,  } from "@/server/schemas/todos"

const router = createRouter()


router.get("/", async () => {
    const todos = await redis.get("todos") || []
    return todos
})

router.post("/", async event => {
    try {
        const body = await readBody(event)
        const todos = await redis.get("todos") || []
        createTodoSchema.parse(body)

        const newTodo = {
            id: cuid(),
            completed: false,
            ...body
        }
        todos.push(newTodo)
        await redis.set("todos", todos)
        return newTodo
    } catch (error) {
        event.res.statusCode = error instanceof ZodError ? 405 : 500
        return {
            error: true,
            message: error.message
        }
    }
})

export default useBase("/api/todos", router.handler)