
export const useTodos = async () => {
  const loading = useState("loadingTodos", () => false);
  const { data: todos } = await useFetch("/api/todos");
  const addTodo = async (newTodoData) => {
    loading.value = true;
    try {
      const newTodo = await $fetch("/api/todos", {
        method: "POST",
        body: newTodoData,
      });
      todos.value.push(newTodo);
    } finally {
      loading.value = false;
    }
  };

  const toggleCompleted = async id => {
    loading.value = true;
    try {
      const todo = todos.value.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
      await $fetch(`/api/todos/completed/${id}`, {
        method: "PUT",
        body: { completed: todo.completed },
      });
    } finally {
      loading.value = false;
    }
  };

  const removeTodo = async id => {
    loading.value = true;
    try {
      await $fetch(`/api/todos/${id}`, { method: "DELETE" });
      const todo = todos.value.find((todo) => todo.id === id);
      todos.value.splice(todos.value.indexOf(todo), 1);
    } finally {
      loading.value = false;
    }
  };

  return { todos, loading, addTodo, toggleCompleted, removeTodo };
};
