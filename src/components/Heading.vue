<template>
  <div class="heading">
    <i class="icon icon--mito"></i>
    <h1>Mito Airline</h1>
  </div>
</template>

<script>
const Heading = {
  name: "Heading"
};
export default Heading;
</script>
<style lang="scss">
.heading {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: $blue-basic;
  color: #fff;

  .icon--mito {
    width: 28px;
    height: 28px;
    background-image: url("~@/assets/mito.svg");
  }

  h1 {
    margin-left: 15px;
    font-size: 17px;
    font-weight: 500;
    text-transform: uppercase;
  }
}
</style>
