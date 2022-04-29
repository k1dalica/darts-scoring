<template>
  <span
    class="typing-indicator"
    :class="{ dark, small }"
  />
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    },

    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .typing-indicator {
    display: inline-block;
    margin-left: 3px;
    width: 15px;
    height: 20px;
    border-bottom-width: 3px;
    border-style: solid;
    animation-name: indicator;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    &.small {
      width: 11px;
      border-bottom-width: 2px;
      margin-left: 2px;
    }
    &.dark {
      animation-name: indicator-dark;
    }
  }

  @keyframes indicator {
    0%   { border-color: $white }
    25%  { border-color: $white }
    50%  { border-color: transparent }
    75%  { border-color: transparent }
    100% { border-color: $white }
  }

  @keyframes indicator-dark {
    0%   { border-color: $black }
    25%  { border-color: $black }
    50%  { border-color: transparent }
    75%  { border-color: transparent }
    100% { border-color: $black }
  }
</style>
