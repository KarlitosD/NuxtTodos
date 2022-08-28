<script setup>
const { loading, addTodo } = await useTodos()

const handleSubmit = async ({ target }) => {
    await addTodo({
        title: target.title.value,
        description: target.description.value
    })
    target.description.value = ""
    target.title.value = ""
}
</script>

<template>
    <Head>
        <Title>TodosNuxt</Title>
        <Meta name="description" content="A tiny page to test Nuxt 3 with redis" ></Meta>
    </Head>
    <form @submit.prevent="handleSubmit">
        <label>Title
            <input type="text" name="title" placeholder="Title" minlength="5" required />
        </label>
        <label>Description
            <textarea name="description" placeholder="A description to task" required />
            <small>Can a very large text</small>
        </label>
        <button :aria-busy="loading" type="submit">Add</button>
    </form>
    <TodosList />
</template>

<style>
textarea {
    resize: none;
}
</style>