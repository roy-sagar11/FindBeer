<template>
  <div class="wrapper">
    <div class="left-panel">
      <div class="search">
        <div class="input-items">
          <label for="search">Search beer</label>
          <input
            name="search"
            id="search"
            type="text"
            v-model="search"
            placeholder="eg. Buzz"
          />
        </div>
        <button @click="getData">{{ loading ? "loading.." : "search" }}</button>
      </div>
      <h3>Results:</h3>
      <h1 v-if="!beers.length">No beers found</h1>
      <h1 v-if="error">An Error occured while getting data</h1>
      <div class="grid">
        <BeerCard
          v-for="beer in beers"
          :key="beer.id"
          :beer="beer"
          :reviews="reviews"
          @toogle-selected="setSelected"
        />
      </div>
    </div>
    <div v-if="selected" class="right-panel">
      <BeerDetails
        :beer="selected"
        :reviews="reviews"
        @new-comment="getReviews"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BeerCard from "./BeerCard.vue";
import BeerDetails from "./BeerDetails.vue";

export default {
  name: "BeerSearch",
  props: {
    msg: String,
  },
  components: {
    BeerCard,
    BeerDetails,
  },
  data() {
    return {
      search: "",
      beers: [],
      reviews: {},
      loading: false,
      error: false,
      selected: null,
      user: "a@b.com",
      timeout: null,
    };
  },
  watch: {
    // debouncing the api call on search string change
    search() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.getData, 700);
    },
  },
  methods: {
    /**
     * method to get beer data from api with search string
     */
    async getData() {
      try {
        this.beers = [];
        this.loading = true;
        this.error = false;
        const { data } = await axios.get(
          "http://localhost:4000/beers?beer_name=" + this.search,
          {
            headers: {
              "x-user": this.user,
            },
          }
        );
        this.beers = data;
        this.selected = null;
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    setSelected(beer) {
      this.selected = beer;
    },

    /**
     * method to get reviews(all) from api
     */
    async getReviews() {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/beers/reviews",
          {
            headers: {
              "x-user": this.user,
            },
          }
        );
        this.reviews = data;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getData();
    this.getReviews();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.wrapper {
  display: flex;
  padding: 30px 20px 0;
}

.right-panel {
  flex: 0.3;
  padding: 0 15px;
  max-height: calc(100vh - 100px);
  overflow: scroll;
}

.left-panel {
  flex: 0.7;
  max-height: calc(100vh - 100px);
  overflow: scroll;
  padding-right: 15px;
  border-right: 2px solid #ddd;
}

.search {
  display: flex;
  padding-bottom: 20px;
  align-items: flex-end;
}

.input-items {
  margin-left: 10px;
  flex: 1;
}

label {
  display: block;
}

input {
  padding: 5px 15px;
  font-size: 1.2rem;
  width: 96%;
}

@media only screen and (max-width: 900px) {
  .grid {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
