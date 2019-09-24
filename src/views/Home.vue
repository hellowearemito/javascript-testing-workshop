<template>
  <div class="home">
    <FlightSearch />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FlightSearch from "@/components/FlightSearch.vue";

const Home = {
  name: "home",
  components: {
    FlightSearch
  },
  mounted() {
    this.loadStations();
  },
  methods: {
    ...mapActions(["loadStations"])
  }
};
export default Home;
</script>
<style lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
</style>
