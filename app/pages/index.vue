<template>
  <div class="home">
    <section class="hero">
      <h1>Welcome</h1>
      <p class="subtitle">A simple Nuxt application with server-side rendering and custom middleware.</p>
    </section>
    <section class="features">
      <div class="card">
        <h3>SSR</h3>
        <p>Pages are rendered on the server for fast initial loads and SEO.</p>
      </div>
      <div class="card">
        <h3>Middleware</h3>
        <p>Custom headers injected on every response via server middleware.</p>
      </div>
      <div class="card">
        <h3>File Routing</h3>
        <p>Pages are automatically mapped to routes from the file system.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.subtitle {
  font-size: 1.125rem;
  color: #6c757d;
  max-width: 480px;
  margin: 0 auto;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #fff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card h3 {
  margin-bottom: 0.5rem;
  color: #00dc82;
}
</style>
