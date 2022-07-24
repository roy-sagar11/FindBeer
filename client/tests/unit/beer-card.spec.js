import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import BeerCard from "@/components/BeerCard.vue";

const exampleBeer = {
  id: 1,
  name: "Buzz",
  description: "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
  firstBrewed: "09/2007",
  foodPairing: [
    "Spicy chicken tikka masala",
    "Grilled chicken quesadilla",
    "Caramel toffee cake",
  ],
  imageUrl: "https://images.punkapi.com/v2/keg.png",
};

const exampleReviews = {
  "1": [
    {
      "rating": 5,
    },
    {
      "rating": 5,
    },
    {
      "rating": 1,
    },
  ],
  "2": [
    {
      "rating": 5,
    },
  ],
};

describe("BeerCard.vue", () => {
  it("renders beer name and beer first brewed when passed", () => {
    const wrapper = shallowMount(BeerCard, {
      props: { beer: exampleBeer, reviews: {} },
    });
    expect(wrapper.text()).to.include(exampleBeer.name);
    expect(wrapper.text()).to.include(exampleBeer.firstBrewed);
  });

  it("shows rating not available when no rating is available", () => {
    const wrapper = shallowMount(BeerCard, {
      props: { beer: exampleBeer, reviews: {} },
    });
    expect(wrapper.text()).to.include("Rating: Not available");
  })

  it("Computes rating correctly when rating data is available", () => {
    const wrapper = shallowMount(BeerCard, {
      props: { beer: exampleBeer, reviews: exampleReviews },
    });
    expect(wrapper.text()).to.include("Rating: 3.7 / 5");
  })
});