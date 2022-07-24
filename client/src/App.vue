<template>
  <div class="root-container">
    <AppHeader />
    <router-view />
  </div>
</template>

<script>
import AppHeader from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  --primary-color: #003366;
}

* {
  padding: 0;
  margin: 0;
}

.flex-align {
  display: flex;
  align-items: center;
}

button {
  height: 37px;
  width: 100px;
  font-size: 1.2rem;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  font-weight: bold;
}

button:hover {
  background-color: #005588;
}

button:active {
  background-color: grey;
}
</style>
