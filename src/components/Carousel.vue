<template>
    <div class="Carousel">
      <div class="Carousel__background">
        <img class="Carousel__background--main" :src="backgroundImage(currentIndex)">
        <img class="Carousel__background--side" :src="backgroundImage(sideImgIndex)">
      </div>
      <div class="Carousel__content">
        <div class="Carousel__content__slider">
          <span
            v-for="(img, index) in images" :key="`${img}-${index}`"
            v-on:click="setIndex(index)"
            class="Carousel__content__slider--item"
            :class="index===currentIndex ? 'Carousel__content__slider--item--selected' : null"
          ></span>
        </div>
        <div class="Carousel__content__container">
          <div class="Carousel__content__container--arrow">
            <span class="Carousel__content__container--arrow--item" v-on:click="decrementIndex">&lsaquo;</span>
          </div>
          <div class="Carousel__content__container--central">
            X
          </div>
          <div class="Carousel__content__container--arrow">
            <span class="Carousel__content__container--arrow--item" v-on:click="incrementIndex">&rsaquo;</span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Timer from '../Timer.js';

export default {
  name: 'Carousel',
  data: function () {
    return {
      images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'],
      currentIndex: 0,
      timer: null,
    }
  },
  methods: {
    backgroundImage (index) {
      return require('@/assets/' + this.images[index]);
    },
    decrementIndex() {
      if (this.currentIndex === 0) {
        this.currentIndex = this.images.length - 1;
      } else {
        this.currentIndex--;
      }
    },
    incrementIndex() {
      if (this.currentIndex === this.images.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++;
      }
    },
    // doFlip() {
    //   this.images.push(this.images.shift());
    //   const illustrations = require.context(
    //       '@/assets/.', false, /\.jpg$/
    //   )
    //   console.log(illustrations.keys())
    // }
    setIndex(index) {
      this.currentIndex = index;
      this.timer.restart();
    }
  },
  computed: {
    sideImgIndex() {
      if (this.currentIndex === this.images.length - 1) {
        return 0;
      }
      return this.currentIndex + 1;
    }
  },
  mounted() {
    this.timer = new Timer(this.incrementIndex, 5000);
  }
}
</script>

<style scoped lang="scss">
.Carousel {
  position: relative;
  width: 100%;
  height: 100%;
  &__content {
    z-index: 100;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    &__slider {
      height: 10%;
      text-align: center;
      &--item {
        background-color: white;
        padding: 5px;
        display: inline-block;
        margin-right: 15px;
        border-radius: 50%;
        cursor: pointer;
        &--selected {
          background-color: #909090;
        }
      }
    }
    &__container {
      width: 100%;
      height: 45%;
      display: flex;
      &--arrow {
        font-size: 7vh;
        color: white;
        height: 100%;
        width: 10%;
        padding: 0 20px;
        &--item {
          cursor: pointer;
        }
        &:last-child {
          text-align: right;
        }
        @media only screen and (hover: none) and (pointer: coarse) {
          display: none;
        }
      }
      &--central {
        font-size: 20px;
        color: white;
        height: 100%;
        width: 100%;
      }
    }
  }
  &__background {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    top: 0;
    left: 0;
    z-index: -100;
    &--main {
      width: 50%;
      @media (max-width: 1024px) {
        width: 100%;
      }
    }
    &--side {
      width: 50%;
      @media (max-width: 1024px) {
        display: none;
      }
    }
  }
}
</style>
