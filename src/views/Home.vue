<template>
  <div class="home">
      <Carousel :images="images">
        <MoreInfo
          :title="title"
          :subtitle="subtitle"
          :btnPropsArray="btnPropsArray">
        </MoreInfo>
      </Carousel>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import MoreInfo from "../components/MoreInfo";

export default {
  name: 'Home',
  components: {
    MoreInfo,
    Carousel
  },
  data: function () {
    return {
      images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
      title: 'Spring 2020',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      btnPropsArray: [
        {
          name: 'Shop Men',
          href: 'https://example.com'
        },
        {
          name: 'Shop Women',
          href: 'https://example.com'
        }
      ]
    }
  },
}
</script>

<style scoped lang="scss">
.home {
  height: 100%;
}
</style>
