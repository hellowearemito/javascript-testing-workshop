<script>
import { mapGetters } from "vuex";
const StationNames = {
  name: "StationNames",
  props: {
    direction: {
      type: String,
      default: true
    }
  },
  computed: {
    ...mapGetters(["selectedStations"]),
    outboundStation() {
      const outboundDirection = this.direction === "outbound" ? "outbound" : "return";
      if (!this.selectedStations[outboundDirection]) return;
      return this.selectedStations[outboundDirection].shortName;
    },
    returnStation() {
      const outboundDirection = this.direction === "outbound" ? "return" : "outbound";
      if (!this.selectedStations[outboundDirection]) return;
      return this.selectedStations[outboundDirection].shortName;
    }
  }
};
export default StationNames;
</script>
