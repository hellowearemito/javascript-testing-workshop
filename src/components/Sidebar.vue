<template>
  <aside class="sidebar">
    <header class="sidebar__header">
      <p>Flights</p>
      <p>${{ total }}</p>
    </header>
    <div class="sidebar__summary">
      <FlightSummary direction="outbound" :is-separator-active="areBothWaysSelected" />
      <FlightSummary v-if="areBothWaysSelected" direction="return" />
    </div>
    <footer class="sidebar__footer">
      <p>Total</p>
      <p data-cy="total">${{ total }}</p>
    </footer>
    <button data-cy="pay" :disabled="isDisabled" class="sidebar__button" @click="setModalState(true)" type="button">
      Pay now
    </button>
  </aside>
</template>
<script>
import { mapActions } from "vuex";
import FlightSummary from "@/components/FlightSummary.vue";
import TotalMixin from "@/mixins/TotalMixin.vue";

const Sidebar = {
  name: "Sidebar",
  components: {
    FlightSummary
  },
  mixins: [TotalMixin],
  computed: {
    isDisabled() {
      return this.total === 0;
    }
  },
  methods: {
    ...mapActions(["setModalState"])
  }
};
export default Sidebar;
</script>
<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  max-width: 230px;
  overflow: hidden;

  &__header {
    display: flex;
    justify-content: space-between;
    padding: 15px 15px 0;
    background-color: #fff;
    border-top: 1px solid $grey-light;
    color: $blue-basic;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;

    p {
      &:first-child {
        color: $grey-super-dark;
      }
    }
  }

  &__summary {
    background-color: #fff;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: $blue-basic;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
  }

  &__button {
    padding: 15px 0;
    margin-top: 20px;
    background-color: $pink-basic;
    color: #fff;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    border: 0;
    border-radius: $border-radius-medium;
    cursor: pointer;

    &:disabled {
      background-color: $grey-light;
      cursor: initial;
    }
  }
}
</style>
