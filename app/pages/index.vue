<template>
  <div class="home">
    <section class="hero">
      <h1>Nuxt Omega Test</h1>
      <p class="subtitle">Static page with a compute health check component.</p>
    </section>

    <section class="status">
      <div class="card" :class="computeClass">
        <h3>Compute Status</h3>
        <div v-if="!mounted" class="pending">⏳ Waiting for client hydration...</div>
        <div v-else-if="pending" class="pending">⏳ Checking compute...</div>
        <div v-else-if="error" class="error">
          <p>❌ Compute error</p>
          <pre class="error-detail">{{ error.statusCode }} {{ error.statusMessage }}
{{ error.data || error.message }}</pre>
        </div>
        <div v-else>
          <p class="ok">✅ Compute is working</p>
          <ul>
            <li>Timestamp: {{ data?.timestamp }}</li>
            <li>Node: {{ data?.node }}</li>
            <li>Runtime: {{ data?.runtime }}</li>
          </ul>
        </div>
      </div>
      <div class="card static-card">
        <h3>Static Content</h3>
        <p class="ok">✅ This section is pre-rendered at build time.</p>
        <p>If you see this but compute shows ❌, the static fallback is working but SSR compute is broken.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const mounted = ref(false)
onMounted(() => { mounted.value = true })

const { data, pending, error } = useFetch('/api/health', {
  server: false,
  lazy: true,
})

const computeClass = computed(() => ({
  'status-ok': mounted.value && !pending.value && !error.value,
  'status-error': mounted.value && !!error.value,
}))
</script>

<style scoped>
.hero { text-align: center; margin-bottom: 2rem; }
.hero h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
.subtitle { color: #6c757d; }
.status { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
.card { background: #fff; border: 1px solid #e9ecef; border-radius: 8px; padding: 1.5rem; }
.card h3 { margin-bottom: 0.5rem; }
.static-card { border-color: #00dc82; }
.status-ok { border-color: #00dc82; }
.status-error { border-color: #e74c3c; }
.ok { color: #00dc82; font-weight: bold; }
.error { color: #e74c3c; }
.error-detail { background: #fdf0f0; border: 1px solid #e74c3c; border-radius: 4px; padding: 0.75rem; margin-top: 0.5rem; font-size: 0.8rem; white-space: pre-wrap; word-break: break-all; }
.pending { color: #6c757d; }
ul { list-style: none; padding: 0; margin-top: 0.5rem; }
li { font-size: 0.875rem; color: #555; }
</style>
