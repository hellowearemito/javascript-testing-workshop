<template>
  <article class="select-flight">
    <div class="select-flight__title">
      <h2 class="select-flight__direction">{{ direction }}</h2>
      <h3>{{ outboundStation }}<i class="icon icon--arrow-right"></i>{{ returnStation }}</h3>
    </div>
    <FareChart :direction="direction" v-if="isRoundTrip" />
    <FareSelector :direction="direction" :flight="flight" v-if="isRoundTrip" />
    <SelectReturn v-else />
  </article>
</template>
<script>
import FareChart from "./FareChart";
import FareSelector from "./FareSelector";
import SelectReturn from "./SelectReturn";
import StationNamesMixin from "@/mixins/StationNamesMixin.vue";

const SelectFlight = {
  name: "SelectFlight",
  components: {
    FareChart,
    FareSelector,
    SelectReturn
  },
  mixins: [StationNamesMixin],
  props: {
    isRoundTrip: {
      type: Boolean,
      default: true
    },
    flight: {
      type: Array,
      default: () => []
    }
  }
};
export default SelectFlight;
</script>
<style lang="scss">
.select-flight {
  box-shadow: 6px 6px 15px rgba(#000, 0.1);

  &:first-child {
    margin-bottom: 40px;
  }

  &__direction {
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    color: $grey-dark;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 14px 20px;
    background-color: $grey;

    h3 {
      display: flex;
      align-items: center;
      margin-left: 45px;
      font-size: 22px;
      font-weight: 700;
      color: $blue-basic;
    }

    .icon--arrow-right {
      margin: 0 25px;
      width: 30px;
      height: 30px;
      background-image: url("~@/assets/arrow-right.svg");
    }
  }
}
</style>
