<template>
  <div class="fare-selector" :data-cy="`fare-selector--${direction}`">
    <div v-for="(flight, index) in flight" :key="index" class="fare-selector__row">
      <time :datetime="flight.departure">
        {{ formatDate(flight.departure, PATTERN_HOUR_MINUTE) }}
        <i class="icon icon--arrow-right-dark"></i>
        {{ formatDate(flight.arrival, PATTERN_HOUR_MINUTE) }}
      </time>
      <div v-for="(fare, key) in flight.fares" :key="key" :data-content="fare.bundle" class="fare-selector__fare">
        <button data-cy="fare" type="button" :class="{ selected: isFareSelected(fare) }" @click="selectFare(fare)">
          ${{ fare.price }}
        </button>
      </div>
    </div>
    <div v-if="hasNoFlights" class="fare-selector__row fare-selector__row--no-flights">
      No flights on this day :(
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { formatDate } from "../utils";
import { PATTERN_HOUR_MINUTE } from "../constants";

const FareSelector = {
  name: "FareSelector",
  props: {
    flight: {
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: true
    }
  },
  data() {
    return {
      PATTERN_HOUR_MINUTE
    };
  },
  computed: {
    ...mapGetters(["selectedFare"]),
    hasNoFlights() {
      return this.flight && this.flight.length === 0;
    }
  },
  methods: {
    formatDate,
    ...mapActions(["setSelectedFare"]),
    selectFare(fare) {
      const payload = {
        direction: this.direction,
        fare
      };
      this.setSelectedFare(payload);
    },
    isFareSelected(fare) {
      const selected = this.selectedFare[this.direction];
      if (selected) return selected.fareSellKey === fare.fareSellKey;
    }
  }
};
export default FareSelector;
</script>
<style lang="scss">
.fare-selector {
  &__row {
    display: flex;
    background-color: #fff;
    border-top: 1px solid $grey-5;

    &:first-child {
      [data-content]:before {
        position: absolute;
        top: 0;
        text-transform: uppercase;
        font-size: 10px;
        font-weight: 700;
        transform: translateY(100%);
        content: attr(data-content);
      }
    }

    &--no-flights {
      display: flex;
      justify-content: center;
      padding: 30px;
    }
  }

  time {
    display: flex;
    align-items: center;
    padding: 16px;
    font-size: 15px;
    font-weight: 300;
    color: $grey-super-dark;
  }

  &__fare {
    position: relative;
    flex: 1 0 195px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 18px;
    text-align: center;

    &:nth-child(3) {
      background-color: $grey;
    }

    button {
      width: 100%;
      height: 100%;
      padding: 11px;
      font-size: 20px;
      font-weight: 700;
      background-color: #fff;
      border: 2px solid $pink-basic;
      border-radius: $border-radius-small;
      cursor: pointer;

      &.selected {
        color: #fff;
        background-color: $pink-basic;
      }
    }
  }

  .icon--arrow-right-dark {
    width: 16px;
    height: 16px;
    padding: 0 8px;
    background-image: url("~@/assets/arrow-right-dark.svg");
  }
}
</style>
