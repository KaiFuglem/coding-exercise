<template>
  <div id="app">
    <FinancialRangeForm/>
  </div>
</template>

<script>
import FinancialRangeForm from './components/FinancialRangeForm.vue'

export default {
  name: 'app',
  components: {
    FinancialRangeForm,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
