<template>
  <div class="container" @click="toogleSelected(beer)">
    <img :src="beer.imageUrl" :alt="beer.name" class="beer-image" />
    <div class="right-details">
      <h3>{{ beer.name }}</h3>
      <p><b>First Brewed: </b>{{ beer.firstBrewed }}</p>
      <p><b>Rating:</b> {{ rating }}</p>
      <p @click="toogleSelected(beer)">Click to view details</p>
    </div>
  </div>
</template>

<script>
import { calculateRating } from "@/util/util.js";
export default {
  name: "BeerCard",
  props: {
    beer: Object,
    reviews: Object,
  },
  data() {
    return {
      details: false,
    };
  },
  methods: {
    toogleSelected(beer) {
      this.$emit("toogle-selected", beer);
    },
  },
  computed: {
    rating() {
      const reviews = this.reviews[this.beer.id];
      return calculateRating(reviews);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  cursor: pointer;
}
.beer-image {
  height: 200px;
  width: 120px;
  object-fit: contain;
}
.right-details {
  padding-left: 20px;
}
</style>
