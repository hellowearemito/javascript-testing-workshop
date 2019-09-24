<template>
  <section class="fare-chart">
    <button type="button" class="fare-chart__stepper" @click="jumpToDate('back')">
      <i class="icon icon--left"></i> {{ formattedDayBefore }}
    </button>
    <div class="fare-chart__main">{{ selectedDate }}</div>
    <button type="button" class="fare-chart__stepper" @click="jumpToDate()">
      {{ formattedDayAfter }} <i class="icon icon--right"></i>
    </button>
  </section>
</template>
<script>
import { addDays, subDays, isBefore, isValid } from "date-fns";
import { formatDate } from "../utils";
import {
  PATTERN_YEAR_MONTH_DATE,
  PATTERN_SHORTDAYNAME_DAY_MONTHNAME,
  PATTERN_DAYNAME_DAY_MONTHNAME_YEARH
} from "../constants";
import { mapGetters, mapActions } from "vuex";

const FareChart = {
  name: "FareChart",
  props: {
    direction: {
      type: String,
      default: true
    }
  },
  computed: {
    ...mapGetters(["departureDate", "returnDate"]),
    selectedDate() {
      const date = this.direction === "outbound" ? this.departureDate : this.returnDate;
      return formatDate(date, PATTERN_DAYNAME_DAY_MONTHNAME_YEARH);
    },
    dayBefore() {
      return subDays(new Date(this.selectedDate), 1);
    },
    formattedDayBefore() {
      if (!isValid(this.dayBefore)) return;
      return formatDate(this.dayBefore, PATTERN_SHORTDAYNAME_DAY_MONTHNAME);
    },
    dayAfter() {
      return addDays(new Date(this.selectedDate), 1);
    },
    formattedDayAfter() {
      if (!isValid(this.dayAfter)) return;
      return formatDate(this.dayAfter, PATTERN_SHORTDAYNAME_DAY_MONTHNAME);
    }
  },
  methods: {
    ...mapActions(["setInputValue", "getResults"]),
    jumpToDate(type) {
      const isReturn = this.direction === "return";
      const isBack = type === "back";
      if (isReturn && isBack && isBefore(this.dayBefore, new Date(this.departureDate))) return;
      const propName = this.direction === "outbound" ? "departureDate" : "returnDate";
      const value = isBack ? this.dayBefore : this.dayAfter;
      const payload = {
        propName,
        value: formatDate(value, PATTERN_YEAR_MONTH_DATE)
      };
      this.setInputValue(payload);
      this.getResults(this.direction);
    }
  }
};
export default FareChart;
</script>
<style lang="scss">
.fare-chart {
  display: flex;
  justify-content: space-between;
  padding: 18px;
  background-color: #fff;

  .icon--left {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    background-image: url("~@/assets/chevron-left.svg");
  }

  .icon--right {
    width: 18px;
    height: 18px;
    margin-left: 10px;
    background-image: url("~@/assets/chevron-right.svg");
  }

  &__stepper {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
    color: $grey-dark;
    text-transform: uppercase;
    cursor: pointer;
    border: 0;
    background: transparent;
  }

  &__main {
    font-size: 18px;
  }
}
</style>
