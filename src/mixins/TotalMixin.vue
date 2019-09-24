<script>
import { mapGetters } from "vuex";

const TotalMixin = {
  name: "TotalMixin",
  computed: {
    ...mapGetters(["selectedFare"]),
    areBothWaysSelected() {
      return Boolean(this.selectedFare.outbound && this.selectedFare.return);
    },
    total() {
      if (this.areBothWaysSelected) return this.selectedFare.outbound.price + this.selectedFare.return.price;
      if (this.selectedFare.outbound) return this.selectedFare.outbound.price;
      if (this.selectedFare.return) return this.selectedFare.return.price;
      return 0;
    }
  }
};
export default TotalMixin;
</script>
