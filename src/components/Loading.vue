<template>
  <div class="loader-wrap">
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
const Loading = {
  name: "Loading"
};
export default Loading;
</script>
<style lang="scss">
.loader-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($grey, 0.5);
  z-index: 1;
}
.loading {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.loading div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 6px solid $pink-basic;
  border-radius: 50%;
  animation: loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: $pink-basic transparent transparent transparent;
}
.loading div:nth-child(1) {
  animation-delay: -0.45s;
}
.loading div:nth-child(2) {
  animation-delay: -0.3s;
}
.loading div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
