import { defineNuxtConfig } from "nuxt"
import { fileURLToPath } from "url"

export default defineNuxtConfig({
  alias: {
    "@": fileURLToPath(new URL("./", import.meta.url)),
  },
  runtimeConfig: {
    redisUri: process.env.REDIS_URI,
  },
  modules: ["@vueuse/nuxt"],
  css: ["@picocss/pico/css/pico.min.css"],

});
