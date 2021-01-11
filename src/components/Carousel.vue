<template>
  <div class="Carousel">
    <div class="Carousel__background">
      <div class="Carousel__background--main" :class="reverse ? 'Carousel__background--main--reversed' : null">
        <transition :name="reverse ? 'slider-right' : 'slider-left'">
          <img class="Carousel__background--img" :src="backgroundImage(currentIndex)" :key="currentIndex">
        </transition>
      </div>
      <div class="Carousel__background--side" :class="reverse ? 'Carousel__background--side--reversed' : null">
        <transition :name="reverse ? 'slider-right' : 'slider-left'">
          <img class="Carousel__background--img" :src="backgroundImage(sideImgIndex)" :key="sideImgIndex">
        </transition>
      </div>
    </div>
    <div @mouseleave="mouseLeave" @mouseover="mouseOver"  class="Carousel__content" v-touch:swipe.left="nextSlide" v-touch:swipe.right="previousSlide">
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
          <button class="Carousel__content__container--arrow--item" :disabled="slidingInProgress" v-on:click="previousSlide">&lsaquo;</button>
        </div>
        <div class="Carousel__content__container--central">
          {{ timeLeft }}
          <slot></slot>
        </div>
        <div class="Carousel__content__container--arrow">
          <button class="Carousel__content__container--arrow--item" :disabled="slidingInProgress" v-on:click="nextSlide">&rsaquo;</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Timer from '../Timer.js';

export default {
  name: 'Carousel',
  props: {
    images: { type: Array, initial: [], required: true }
  },
  data: function () {
    return {
      currentIndex: 0,
      timer: null,
      reverse: false,
      slidingInProgress: false,
    }
  },
  methods: {
    backgroundImage (index) {
      return require('@/assets/' + this.images[index]);
    },
    nextSlide() {
      this.performAnimationActions(false);
      this.incrementIndex();
      this.timer.restart();
    },
    previousSlide() {
      this.performAnimationActions(true);
      this.decrementIndex();
      this.timer.restart();
    },
    setIndex(index) {
      this.currentIndex = index;
      this.timer.restart();
    },
    decrementIndex() {
      this.currentIndex === 0 ? this.currentIndex = this.images.length - 1 : this.currentIndex--;
    },
    incrementIndex() {
      this.currentIndex === this.images.length - 1 ? this.currentIndex = 0 : this.currentIndex++;
    },
    performAnimationActions(reversed) {
      this.reverse = reversed;
      this.slidingInProgress = true;
      setTimeout(() => this.slidingInProgress = false, 350);
    },
    mouseOver() {
      this.timer.pause();
    },
    mouseLeave() {
      this.timer.resume();
    },
  },
  computed: {
    sideImgIndex() {
      if (this.currentIndex === this.images.length - 1) {
        return 0;
      }
      return this.currentIndex + 1;
    },
    timeLeft() {
      return this.timer?.timeLeft;
    }
  },
  mounted() {
    this.timer = new Timer(() => {
      this.performAnimationActions(false);
      this.incrementIndex();
    }, 5000);
    window.addEventListener('blur', () => {
      this.timer.pause();
    });
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
      min-height: 45%;
      display: flex;
      &--arrow {
        height: 100%;
        width: 10%;
        padding: 0 20px;
        &--item {
          border: none;
          background-color: transparent;
          color: white;
          font-size: 7vh;
          cursor: pointer;
          &:disabled {
            cursor: not-allowed;
          }
          &:focus {
            outline: none;
          }
        }
        &:last-child {
          text-align: right;
        }
        @media only screen and (hover: none) and (pointer: coarse) {
          display: none;
        }

        @media (max-width: 768px) {
          display: none;
        }
      }
      &--central {
        font-size: 20px;
        color: white;
        height: 100%;
        width: 100%;
        text-align: center;
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
    overflow: hidden;

    .slider-left-leave-active, .slider-left-enter-active,
    .slider-right-leave-active, .slider-right-enter-active {
      transition: 0.3s linear;
    }

    .slider-left-leave-to {
      transform: translateX(-100%);
    }

    .slider-left-enter-to {
      transform: translateX(-100%);
    }

    .slider-right-leave-to {
      transform: translateX(100%);
    }

    .slider-right-enter-to {
      transform: translateX(100%);
    }

    &--main {
      width: 50%;
      height: 100%;
      overflow: hidden;
      display: flex;

      &--reversed {
        flex-direction: row-reverse;
      }

      @media (max-width: 1024px) {
        width: 100%;
      }
    }
    &--side {
      width: 50%;
      height: 100%;
      overflow: hidden;
      display: flex;

      &--reversed {
        flex-direction: row-reverse;
      }

      @media (max-width: 1024px) {
        display: none;
      }
    }

    &--img {
      min-width: 100%;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
