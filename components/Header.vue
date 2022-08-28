<script setup>
const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <header>
    <nav class="container">
      <ul>
        <li><strong>Nuxt</strong>Todos</li>
      </ul>
      <ul>
        <li>
          <button @click="toggleDark()" class="contrast outline">
            {{ isDark ?  "☀" : "🌙"  }}
          </button>
        </li>
      </ul>
    </nav>
  </header>    
</template>