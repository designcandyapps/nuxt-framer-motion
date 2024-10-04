<template>
  <div class="list">
    <div class="nav">
      <NuxtLink to="/animation">
        Animation
      </NuxtLink>
      <NuxtLink to="/variants">
        Variants
      </NuxtLink>
      <NuxtLink to="/drag">
        Drag
      </NuxtLink>
      <NuxtLink to="/gestures">
        Gestures
      </NuxtLink>
      <NuxtLink to="/scroll">
        Scroll
      </NuxtLink>
      <NuxtLink to="/path">
        Path
      </NuxtLink>
    </div>
    <NuxtPage />
  </div>
</template>

<style>
body {
  margin: 0;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.nav {
  display: flex;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  margin: auto;
  padding: 1rem 0;
  gap: 1rem;
}

* {
  font-family: sans-serif;
}

h1 {
  color: white;
}
</style>
