<template>
  <article class="select-return-flight">
    <div class="select-return-flight__wrapper">
      <DateInput store-prop="returnDate" label-text="Return Date" :required="true" />
      <button type="button" @click="startSearch">Search</button>
    </div>
  </article>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DateInput from "./DateInput.vue";

const SelectReturn = {
  name: "SelectReturn",
  components: {
    DateInput
  },
  computed: {
    ...mapGetters(["returnDate"])
  },
  methods: {
    ...mapActions(["getResults"]),
    startSearch() {
      if (!this.returnDate) return;
      this.getResults("return");
    }
  }
};
export default SelectReturn;
</script>
<style lang="scss">
.select-return-flight {
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0 60px;
    background-color: #fff;

    .date-input {
      max-width: 250px;
    }
  }

  button {
    padding: 13px 23px;
    margin: 0 5px;
    background-color: $blue-light;
    font-size: 18px;
    font-weight: 500;
    text-transform: uppercase;
    color: #fff;
    border: 0;
    border-radius: $border-radius-medium;
    cursor: pointer;
  }
}
</style>
