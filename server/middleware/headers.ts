export default defineEventHandler((event) => {
  setHeader(event, 'X-Custom-Header', 'nuxt-app')
})
