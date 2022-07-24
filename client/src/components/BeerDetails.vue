<template>
  <div class="container">
    <h3>{{ beer.name }}</h3>
    <img :src="beer.imageUrl" :alt="beer.name" class="beer-image" />
    <p><b>Rating: </b>{{ rating }}</p>
    <p><b>Description:</b></p>
    <p>{{ beer.description }}</p>
    <h3>Add a review</h3>
    <div>
      <label for="user">User email</label>
      <input type="text" name="user" id="user" v-model="user" />
    </div>
    <div class="select-wrap">
      <label for="rating">Rating</label>
      <select name="rating" id="rating" v-model="userRating">
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      <label for="search">Comment</label>
      <textarea rows="4" v-model="userComment" />
    </div>
    <button @click="submitComment">Submit</button>
    <div v-if="error">
      <p class="error">{{ error }}</p>
    </div>
    <h3>Comments:</h3>
    <div v-for="r in review" :key="r.id" class="comment">
      <p>
        <b>{{ r.user }}</b>
      </p>
      <p>{{ r.comment }}</p>
      <p>Rating: {{ r.rating }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { calculateRating } from "@/util/util.js";
export default {
  name: "BeerDetails",
  props: {
    beer: Object,
    reviews: Object,
  },
  data() {
    return {
      user: "a@b.com",
      userRating: "",
      userComment: "",
      options: ["", 1, 2, 3, 4, 5],
      loading: false,
      error: false,
    };
  },
  computed: {
    rating() {
      const reviews = this.reviews[this.beer.id];
      return calculateRating(reviews);
    },
    review() {
      return this.reviews[this.beer.id] || [];
    },
  },
  watch: {
    beer() {
      this.error = false;
    },
  },
  methods: {
    async submitComment() {
      this.loading = true;
      this.error = false;
      try {
        await axios.put(
          "http://localhost:4000/beers/review/" + this.beer.id,
          {
            rating: +this.userRating,
            comment: this.userComment,
          },
          {
            headers: {
              "x-user": this.user,
            },
          }
        );
        this.$emit("new-comment");
      } catch (e) {
        this.error =
          (e?.response?.data?.details && e.response.data.details[0]?.message) ||
          e.message ||
          "An error has occured";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding-bottom: 40px;
}
.beer-image {
  width: 200px;
  height: 300px;
  object-fit: contain;
}

.error {
  margin-top: 15px;
  background-color: rgba(255, 0, 0, 0.2);
  color: red;
  padding: 10px;
}

.select-wrap {
  margin-top: 10px;
}

.comment {
  margin: 5px 0;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.comment > p {
  padding: 3px 0 0;
}

select {
  height: 37px;
  width: 100%;
  margin-bottom: 20px;
  font-size: 1.2rem;
  padding: 5px;
}

textarea {
  width: 100%;
  font-size: 1.2rem;
  padding: 5px;
}

input {
  width: 100%;
  padding: 5px;
  font-size: 1.2rem;
  width: 97%;
}
p {
  padding: 10px 0 0;
}

h3 {
  padding: 10px 0;
}
</style>
