<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <header>
      <nav>
        <NuxtLink to="/" class="logo">Nuxt App</NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
        </div>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <p>Built with Nuxt</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a2e;
  background: #f8f9fa;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: #fff;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  z-index: 10;
}

nav {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: #00dc82;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #495057;
  font-weight: 500;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #00dc82;
  border-bottom-color: #00dc82;
}

main {
  flex: 1;
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 2rem;
  width: 100%;
}

footer {
  background: #1a1a2e;
  color: #adb5bd;
  text-align: center;
  padding: 1.5rem 2rem;
  font-size: 0.875rem;
}
</style>
