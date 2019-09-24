<template>
  <div id="app">
    <Loading v-if="isLoading"></Loading>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Loading from "@/components/Loading.vue";
const App = {
  name: "App",
  components: {
    Loading
  },
  computed: {
    ...mapGetters(["isLoading"])
  }
};
export default App;
</script>
<style lang="scss">
html {
  height: 100%;
}
body {
  min-height: 100%;
  background-color: $grey;
}
#app {
  height: 100vh;
  background-image: url("~@/assets/map.svg");
  background-repeat: no-repeat;
  background-position: bottom right;
}
</style>
