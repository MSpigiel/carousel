<template>
  <div class="infoBox">
    <div class="infoBox__header infoBox__header--main">{{ title }}</div>
    <div class="infoBox__header infoBox__header--sub">{{ subtitle }}</div>
    <div class="infoBox__buttons">
      <span
        v-for="(btn, index) in btnPropsArray"
        :key="index"
        class="infoBox__buttons--item">
        {{ btn.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoreInfo",
  props: {
    title: String,
    subtitle: String,
    btnPropsArray: Array,
  }
}
</script>

<style scoped lang="scss">
  .infoBox {
    width: 80%;
    margin: 0 auto;
    font-family: Verdana;

    &__header {
      text-align: center;
      margin-bottom: 10px;
      &--main {
        text-transform: uppercase;
        font-size: 34px;
        font-weight: bold;
      }
      &--sub {
        font-size: 15px;
      }
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      &--item {
        width: 300px;
        border: 2px solid white;
        color: white;
        font-weight: bold;
        text-align: center;
        padding: 10px 0;
        text-transform: uppercase;
        margin: 20px;
        cursor: pointer;
      }
    }
  }
</style>