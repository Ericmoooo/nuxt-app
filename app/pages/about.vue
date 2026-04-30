<template>
  <div class="about">
    <h1>About</h1>
    <p>
      This is a Nuxt application demonstrating server-side rendering with custom
      server middleware that injects an <code>X-Custom-Header</code> on every response.
    </p>
    <div class="tech-stack">
      <h2>Tech Stack</h2>
      <ul>
        <li>Nuxt 3</li>
        <li>Nitro server engine</li>
        <li>Vue 3 with Composition API</li>
        <li>File-based routing</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.about p {
  color: #495057;
  max-width: 600px;
  margin-bottom: 2rem;
}

code {
  background: #e9ecef;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.tech-stack {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 400px;
}

.tech-stack h2 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.tech-stack ul {
  list-style: none;
  padding: 0;
}

.tech-stack li {
  padding: 0.4rem 0;
  border-bottom: 1px solid #f1f3f5;
  color: #495057;
}

.tech-stack li:last-child {
  border-bottom: none;
}
</style>
