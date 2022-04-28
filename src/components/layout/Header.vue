<template>
  <header :class="{ transparent }">
    <router-link :to="{ name: 'Home' }">
      <div id="logo">
        <img src="@/assets/images/logo.png">
      </div>
    </router-link>

    <div class="flex">
      <slot />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: $white;
    z-index: 999;
    &.transparent {
      background-color: transparent;
    }
    #logo {
      display: block;
      img {
        display: block;
        height: 30px;
      }
    }
  }
</style>
