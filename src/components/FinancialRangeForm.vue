<template>
  <form @submit.prevent="submitForm">

    <!-- Minimum input -->
    <div>
      <label for="minimum-input">Minimum:</label>
      <input
        id="minimum-input"
        autocomplete="off"
        v-model="minValue"
      />
      <span v-if="computedMin.toString() && minValue" class="computed-value">
        ({{ computedMin.toString() }})
      </span>
    </div>

    <!-- Maximum input -->
    <div>
      <label for="maximum-input">Maximum:</label>
      <input
        id="maximum-input"
        autocomplete="off"
        v-model="maxValue"
      />
      <span v-if="computedMax.toString() && maxValue" class="computed-value">
        ({{ computedMax.toString() }})
      </span>
    </div>

    <!-- Submit button -->
    <div>
      <button type="submit">Submit</button>
    </div>

    <!-- Validation errors -->
    <div class="validation message">
      {{ validationMessage }}
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="success message">
      <div>{{ successMessage }}</div>
      <div>Minimum: {{ computedMin }}</div>
      <div>Maximum: {{ computedMax }}</div>
    </div>

  </form>
</template>

<script>
export default {
  name: 'FinancialRangeForm',

  data() {
    return {
      minValue: '',
      maxValue: '',
      validationMessage: '',
      successMessage: '',
    };
  },

  computed: {
    /**
     * Computed minimum -- value is expanded then conversion to Number is attempted
     * @return {Number} - computed minimum value (can still be NaN)
     */
    computedMin() {
      return Number(this.expand(this.minValue));
    },

    /**
     * Computed maximum -- value is expanded then conversion to Number is attempted
     * @return {Number} - computed maximum value (can still be NaN)
     */
    computedMax() {
      return Number(this.expand(this.maxValue));
    },

    /**
     * Computed difference -- used to check if Minimum is greater than Maximum
     * @return {Number} - (maximum - minimum)
     */
    computedDifference() {
      return this.computedMax - this.computedMin;
    },

    /**
     * @return {Boolean} - Is only 1 field blank?
     */
    isOneFieldBlank() {
      return this.minValue === '' && this.maxValue || this.maxValue === '' && this.minValue;
    },
  },

  watch: {
    minValue() {
      this.validationMessage = '';
      this.successMessage = '';
    },
    maxValue() {
      this.validationMessage = '';
      this.successMessage = '';
    },
  },

  methods: {
    /**
     * Submit and validate form
     */
    submitForm() {
      if (Number.isNaN(this.computedMin)) {
        this.validationMessage = 'Minimum value is not a number';
        return;
      }
      if (Number.isNaN(this.computedMax)) {
        this.validationMessage = 'Maximum value is not a number';
        return;
      }
      if (this.computedDifference < 0) {
        this.validationMessage = 'Minimum cannot be greater than Maximum';
        return;
      }
      if (this.isOneFieldBlank) {
        this.validationMessage = 'One field cannot be blank';
        return;
      }
      this.successMessage = 'Successfully submitted:';
    },

    /**
     * Expand predefined shorthands
     * @param {String} value - input value
     * @return {String} - possibly expanded value
     */
    expand(value) {
      if (!value) {
        return value;
      }
      const lastChar = value.charAt(value.length - 1).toLowerCase();
      let expanded = value;

      if (lastChar === 'm') {
        expanded = value.slice(0, value.length - 1);
        expanded *= 1000000;
      } else if (lastChar === 'k') {
        expanded = value.slice(0, value.length - 1);
        expanded *= 1000;
      }
      return expanded.toString();
    },
  },
};
</script>

<style lang="scss" scoped>
  $padding: 10px;

  div {
    margin: $padding;
  }

  label {
    display: inline-block;
    min-width: 85px;
  }

  .computed-value {
    margin-left: $padding;
  }

  .message {
    margin-top: $padding * 2;
    font-size: 12px;
  }

  .validation {
    color: darkred;
  }

  .success {
    color: darkgreen;
  }
</style>
