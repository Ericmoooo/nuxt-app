export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    runtime: 'Lambda Lite',
    node: process.version,
  }
})
