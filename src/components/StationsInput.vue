<template>
  <div class="text-input">
    <label class="input input--default">
      <input
        type="text"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="[
          'input__field',
          {
            'input__field--has-value': hasValue
          }
        ]"
        v-model.trim="val"
        ref="input"
        :data-cy="`${direction}Station`"
        @keyup="storeValue"
        @focus="toggleStations()"
      />
      <span class="input__label" v-if="labelText">
        {{ labelText }}
      </span>
    </label>
    <ul v-if="isStationListVisible" class="station-list">
      <li v-for="(station, index) in filteredStations" :key="index" @click="setSelectedStation(station)">
        {{ station.shortName }} ({{ station.iata }})
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { filterStations } from "../utils";

const TextInput = {
  name: "TextInput",
  props: {
    labelText: String,
    placeholder: String,
    required: Boolean,
    disabled: Boolean,
    storeProp: {
      type: String,
      required: true
    },
    stations: {
      type: Array,
      required: true
    },
    direction: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      val: "",
      isStationListVisible: false
    };
  },
  computed: {
    hasValue() {
      return this.val ? `${this.val}`.trim().length > 0 : false;
    },
    filteredStations() {
      if (!this.hasValue) return this.stations;
      return filterStations(this.stations, this.val);
    }
  },
  methods: {
    ...mapActions(["setInputValue", "selectStation"]),
    storeValue() {
      const payload = {
        propName: this.storeProp,
        value: this.val
      };
      this.setInputValue(payload);
    },
    toggleStations(shouldShow = true) {
      this.isStationListVisible = shouldShow;
    },
    setSelectedStation(station) {
      this.val = station.shortName;
      this.toggleStations(false);
      this.selectStation({ type: this.direction, station });
    }
  }
};
export default TextInput;
</script>
<style lang="scss">
.text-input {
  position: relative;
  width: 100%;
}

.station-list {
  position: absolute;
  right: 10px;
  left: 10px;
  padding: 10px 0;
  max-height: 200px;
  overflow-x: scroll;
  z-index: 1;
  background-color: #fff;

  li {
    padding: 5px 0;
    cursor: pointer;

    &:hover {
      color: $pink-basic;
    }
  }
}

.input {
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
    &--has-value {
      outline: 0;

      + #{$self}__label {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
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

    .input__field {
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
