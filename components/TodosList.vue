<script setup>
const { todos, toggleCompleted, removeTodo, loading } = await useTodos()
</script>

<template>
    <article v-auto-animate>
        <div v-for="todo in todos" :key="todo.id" class="todos" v-if="todos.length">
            <label>
                <input type="checkbox" :value="todo.completed" @change="toggleCompleted(todo.id)" />
                {{ todo.title }}
            </label>
            <button type="button" @click="removeTodo(todo.id)" :disabled="loading">
                <img src="https://icongr.am/octicons/x.svg?size=60&color=ffffff" alt="X icon">
            </button>
        </div>
        <div v-else class="no-todos">
            Without todos
        </div>
    </article>
</template>

<style scoped>
.todos {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 5px;
}

.todos button {
    --primary: rgb(211, 56, 56);
    --primary-hover: rgb(255, 70, 70);
    width: 60px;
    display: flex;
}

label {
    cursor: pointer;
}

.no-todos {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
}
</style>