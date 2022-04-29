<template>
  <header :class="{ transparent }">
    <router-link :to="{ name: 'Home' }">
      <div id="logo">
        <LogoSvg
          class="svg"
        />
      </div>
    </router-link>

    <div class="flex">
      <slot />
    </div>
  </header>
</template>

<script>
import LogoSvg from '@/assets/images/logo.svg'

export default {
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  },

  components: {
    LogoSvg
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
      .svg {
        height: 34px;
      }
    }
  }
</style>
