<template>
  <div :class="flightSummaryClasses">
    <time v-if="isDepartureSelected" :datetime="formatDate(departureDate, PATTERN_YEAR_MONTH_DATE)">
      <span>{{ formatDate(departureDate, PATTERN_SHORTMONTHNAME) }}</span>
      <span>{{ formatDate(departureDate, PATTERN_DAY) }}</span>
    </time>
    <div class="flight-summary__info">
      <p>{{ outboundStation }} - {{ returnStation }}</p>
      <small>
        {{ formatDate(departureDate, PATTERN_SHORTDAYNAME) }}
        {{ formatDate(departureDate, PATTERN_HOUR_MINUTE) }} -
        {{ formatDate(arrivalDate, PATTERN_HOUR_MINUTE) }}
      </small>
    </div>
  </div>
</template>
<script>
import { formatDate } from "../utils";
import {
  PATTERN_HOUR_MINUTE,
  PATTERN_SHORTDAYNAME,
  PATTERN_YEAR_MONTH_DATE,
  PATTERN_DAY,
  PATTERN_SHORTMONTHNAME
} from "../constants";
import { mapGetters } from "vuex";
import StationNamesMixin from "@/mixins/StationNamesMixin.vue";
const FlightSummary = {
  name: "FlightSummary",
  props: {
    isSeparatorActive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      PATTERN_HOUR_MINUTE,
      PATTERN_SHORTDAYNAME,
      PATTERN_YEAR_MONTH_DATE,
      PATTERN_DAY,
      PATTERN_SHORTMONTHNAME
    };
  },
  mixins: [StationNamesMixin],
  computed: {
    ...mapGetters(["outboundDepartureDate", "returnDepartureDate"]),
    flightSummaryClasses() {
      return ["flight-summary", { "flight-summary--with-separator": this.isSeparatorActive }];
    },
    departureDate() {
      if (this.direction === "outbound" && this.outboundDepartureDate) {
        return this.outboundDepartureDate.departure;
      }
      if (this.direction === "return" && this.returnDepartureDate) {
        return this.returnDepartureDate.departure;
      }
      return null;
    },
    arrivalDate() {
      if (this.direction === "outbound" && this.outboundDepartureDate) {
        return this.outboundDepartureDate.arrival;
      }
      if (this.direction === "return" && this.returnDepartureDate) {
        return this.returnDepartureDate.arrival;
      }
      return null;
    },
    isDepartureSelected() {
      return this.departureDate !== null;
    }
  },
  methods: {
    formatDate
  }
};
export default FlightSummary;
</script>
<style lang="scss">
.flight-summary {
  position: relative;
  display: flex;
  padding: 15px;
  color: $grey-super-dark;

  time {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid $grey;
    border-radius: $border-radius-medium;

    span {
      padding: 2px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;

      &:first-child {
        background-color: $grey;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 12px;
    font-weight: 700;

    p {
      font-size: 14px;
    }

    small {
      font-size: 10px;
    }
  }

  &--with-separator {
    &::after {
      position: absolute;
      bottom: -10px;
      left: 0;
      right: 0;
      content: url("~@/assets/separator.svg");
    }
  }
}
</style>
