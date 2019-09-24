<template>
  <div class="flight-search">
    <Heading />
    <div class="flight-search__content">
      <div class="flight-search__inputs">
        <StationsInput
          store-prop="origin"
          label-text="Origin"
          :required="true"
          :stations="stations"
          direction="outbound"
        />
        <StationsInput
          store-prop="destination"
          label-text="Destination"
          :required="true"
          :stations="returnStations"
          direction="return"
        />
      </div>
      <div class="flight-search__inputs">
        <DateInput store-prop="departureDate" label-text="Departure Date" :required="true" />
        <DateInput store-prop="returnDate" label-text="Return Date" :required="true" />
      </div>
      <div class="flight-search__inputs">
        <button data-cy="submitSearch" type="button" class="flight-search__button" @click="startSearch">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "./Heading.vue";
import StationsInput from "./StationsInput.vue";
import DateInput from "./DateInput.vue";

const FlightSearch = {
  name: "FlightSearch",
  components: {
    Heading,
    StationsInput,
    DateInput
  },
  data() {
    return {
      isErrorTriggered: false
    };
  },
  computed: {
    ...mapGetters(["stations", "returnStations", "search", "selectedStations"])
  },
  methods: {
    ...mapActions(["getResults"]),
    startSearch() {
      this.isErrorTriggered = false;
      if (!this.selectedStations.outbound || !this.selectedStations.return || !this.search.departureDate) {
        this.isErrorTriggered = true;
        return;
      }
      this.getResults("outbound");
      if (this.search.returnDate) {
        this.getResults("return");
      }
      this.$router.push({ path: "flight-select" });
    }
  }
};
export default FlightSearch;
</script>
<style lang="scss">
.flight-search {
  width: 570px;
  background-color: #fff;
  box-shadow: 6px 6px 15px rgba(#000, 0.1);
  border-radius: $border-radius-small;
  overflow: hidden;

  &__content {
    padding: 25px 15px;
  }

  &__inputs {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;

    &:last-child {
      margin-bottom: 20px;
    }
  }

  &__button {
    padding: 13px 78px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    text-transform: uppercase;
    text-decoration: none;
    background-color: $blue-light;
    border: 0;
    border-radius: $border-radius-medium;
    cursor: pointer;
  }
}
</style>
