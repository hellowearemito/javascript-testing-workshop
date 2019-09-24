<template>
  <div class="modal-backdrop" @click.self="setModalState(false)">
    <div class="modal" data-cy="modal">
      <h3 class="modal__title">Thanks for buying your tickets at mito airlines</h3>
      <div class="modal__content">
        <FlightSummary direction="outbound" />
        <FlightSummary v-if="areBothWaysSelected" direction="return" />
      </div>
      <div class="modal__footer">
        <p>
          Total: <span>${{ total }}</span>
        </p>
        <button type="button" @click="resetAndGoBack" data-cy="reset">No, Thanks (reset)</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import FlightSummary from "@/components/FlightSummary.vue";
import TotalMixin from "@/mixins/TotalMixin.vue";

const Modal = {
  name: "Modal",
  components: {
    FlightSummary
  },
  mixins: [TotalMixin],
  methods: {
    ...mapActions(["setModalState", "reset"]),
    resetAndGoBack() {
      this.reset();
      this.$router.push({ path: "/" });
    }
  }
};
export default Modal;
</script>
<style lang="scss">
.modal-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(#000, 0.5);
}

.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background-color: #fff;

  &__title {
    padding: 15px 30px;
    background-color: $grey-5;
    font-size: 16px;
    font-weight: 300;
    color: $blue-basic;
    text-transform: uppercase;
  }

  &__content {
    display: flex;
    padding: 25px 15px;

    .flight-summary {
      max-width: 180px;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    padding: 0 30px 25px;

    p {
      font-size: 20px;
      font-weight: 500;
      color: $grey-super-dark;
      text-transform: uppercase;

      span {
        color: $blue-basic;
      }
    }

    button {
      font-size: 12px;
      font-weight: 700;
      color: $pink-basic;
      text-transform: uppercase;
      border: 0;
      cursor: pointer;
    }
  }
}
</style>
