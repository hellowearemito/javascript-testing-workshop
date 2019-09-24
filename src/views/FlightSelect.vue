<template>
  <div class="flight-select">
    <Heading />
    <h1 class="flight-select__title"><i class="icon icon--plane"></i> Select flight</h1>
    <section class="flight-select__selector">
      <Sidebar />
      <div class="flight-select__fares">
        <SelectFlight :flight="flights.outbound" direction="outbound" />
        <SelectFlight :flight="flights.return" :is-round-trip="isRoundTrip" direction="return" />
      </div>
    </section>
    <Modal v-if="isModalVisible" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import Heading from "@/components/Heading.vue";
import Sidebar from "@/components/Sidebar.vue";
import SelectFlight from "@/components/SelectFlight.vue";
import Modal from "@/components/Modal.vue";

const FlightSelect = {
  name: "FlightSelect",
  components: {
    Heading,
    Sidebar,
    SelectFlight,
    Modal
  },
  computed: {
    ...mapGetters(["isModalVisible", "isRoundTrip", "flights"])
  }
};
export default FlightSelect;
</script>
<style lang="scss">
.flight-select {
  &__title {
    display: flex;
    align-items: center;
    padding-left: 270px;
    margin: 40px 0;
    color: $blue-basic;
    font-size: 40px;
    font-weight: 300;
    text-transform: uppercase;
  }

  .icon--plane {
    margin-right: 25px;
    width: 40px;
    height: 40px;
    background-image: url("~@/assets/plane.svg");
  }

  &__selector {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  &__fares {
    display: flex;
    flex-direction: column;
    width: calc(100% - 250px); // 270 = summary width + margin
  }
}
</style>
