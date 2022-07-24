<template>
  <div class="sticky">
    <div class="container flex-align">
      <img src="../assets/beer.png" />
      <h1>Beer Finder</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.container {
  background-color: var(--primary-color);
}
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
}
h1 {
  color: #fff;
  padding: 10px;
  font-size: 2.4rem;
}

img {
  width: 35px;
  height: 35px;
  margin-left: 30px;
}
</style>
