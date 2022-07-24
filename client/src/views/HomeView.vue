<template>
  <div class="home">
    <BeerSearch />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import BeerSearch from "../components/BeerSearch.vue";

export default {
  name: "HomeView",
  components: {
    BeerSearch,
  },
};
</script>
