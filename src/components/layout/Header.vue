<template>
  <header>
    <div id="logo">
      <img src="@/assets/images/logo.png">
    </div>

    <portal-target name="header" />
  </header>
</template>

<script>
export default {
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
    #logo {
      display: block;
      img {
        display: block;
        height: 30px;
      }
    }
  }
</style>
