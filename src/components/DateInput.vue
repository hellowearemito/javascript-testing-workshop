<template>
  <label :class="['date-input date-input--default', { 'date-input__field--has-value': hasValue }]" :data-cy="storeProp">
    <flat-pickr
      v-model="date"
      :config="dateInputConfig"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      name="date"
    >
    </flat-pickr>
    <span class="date-input__label" v-if="labelText">
      {{ labelText }}
    </span>
  </label>
</template>
<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { formatDate } from "../utils";
import { mapGetters, mapActions } from "vuex";
import { endOfYesterday } from "date-fns";
import { PATTERN_YEAR_MONTH_DATE } from "../constants";

const DateInput = {
  name: "DateInput",
  components: {
    flatPickr
  },
  props: {
    labelText: String,
    placeholder: String,
    required: Boolean,
    disabled: Boolean,
    storeProp: {
      type: String,
      required: true
    }
  },
  watch: {
    date() {
      this.storeValue();
    }
  },
  data() {
    return {
      date: ""
    };
  },
  computed: {
    ...mapGetters(["departureDate"]),
    hasValue() {
      return this.date ? `${this.date}`.trim().length > 0 : false;
    },
    lastSelectableDate() {
      if (this.storeProp === "returnDate" && this.departureDate) {
        return formatDate(this.departureDate, PATTERN_YEAR_MONTH_DATE);
      }
      return formatDate(endOfYesterday(), PATTERN_YEAR_MONTH_DATE);
    },
    dateInputConfig() {
      return {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "M j, Y",
        altInput: true,
        dateFormat: "Y-m-d",
        altInputClass: "date-input__field",
        minDate: this.lastSelectableDate
      };
    }
  },
  methods: {
    formatDate,
    ...mapActions(["setInputValue"]),
    storeValue() {
      const payload = {
        propName: this.storeProp,
        value: this.date
      };
      this.setInputValue(payload);
    }
  }
};
export default DateInput;
</script>
<style lang="scss">
.date-input {
  $self: &;

  position: relative;
  flex: 1;
  display: block;
  padding-top: 10px;
  margin: 0 10px;

  &__label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    font-size: 16px;
    font-weight: 400;
    transform: translateY(100%);
    transition: 0.3s ease-in-out;
    pointer-events: none;
  }

  &__field {
    display: block;
    border: 0;
    padding: 0;
    width: 100%;
    background: none;
    font-family: inherit;
    font-weight: 400;
    font-size: 16px;
    text-align: inherit;
    color: $grey-super-dark;

    + #{$self}__label {
      opacity: 1;
      transform: translateY(5px);
    }

    &:focus,
    .date-input__field--has-value &,
    &--has-value {
      outline: 0;

      + #{$self}__label {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
        font-size: 10px;
        font-weight: 900;
        text-transform: uppercase;
      }
    }
  }

  &--default {
    border: 1px solid $grey-dark;
    border-radius: $border-radius-small;
    background: #fff;
    font-weight: 700;
    transition: box-shadow $default-transition, border-color $default-transition;

    &--focus {
      box-shadow: 0 2px 6px rgba(#000, 0.15);
    }

    #{$self} {
      &__label {
        top: 9px;
        left: 10px;
        color: $grey-dark;
      }

      &__field {
        padding: 8px 10px 9px;

        &:focus,
        &--has-value {
          + #{$self}__label {
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
          }
        }
      }
    }
  }

  &--disabled {
    background-color: transparent;

    .date-input__field {
      color: $grey-dark;
    }
  }

  &--error {
    border: 1px solid $grey-dark;

    #{$self}__icon {
      color: $grey-dark;
    }
  }
}
</style>
