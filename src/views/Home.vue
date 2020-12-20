<template>
  <div class="home">
      <Carousel></Carousel>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";

export default {
  name: 'Home',
  components: {
    Carousel
  }
}
</script>

<style scoped lang="scss">
.home {
  height: 100%;
}
</style>
