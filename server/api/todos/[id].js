import { ZodError } from "zod"
import redis from "@/redis/index.js"

const methodsHandlers = {
    async delete(event){
        const todos = await redis.get("todos") || []
        const { id } = getRouterParams(event)
        const todoIndex = todos.findIndex(todo => todo.id === id)
        if (todoIndex === -1) throw new Error("Todo not found")
        const todo = todos[todoIndex]
        todos.splice(todoIndex, 1)
        await redis.set("todos", todos)
        return todo
    }
}

export default async event => {
    try {
        const method = await getMethod(event)
        const handler =  methodsHandlers[method.toLowerCase()]
        if(!handler) throw new Error("Method not allowed")

       return await handler(event)
    } catch (error) {
        const message = error.message || error || "Error message"
        event.res.statusCode = error instanceof ZodError ? 405 : 500
        console.error(message)
        return { error: true, message }
    }
}