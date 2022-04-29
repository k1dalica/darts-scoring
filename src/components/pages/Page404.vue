<template>
  <div id="page">
    <Header>
      <router-link :to="{ name: 'Play' }">
        <vs-button
          circle
          relief
        >
          Play
        </vs-button>
      </router-link>
    </Header>

    <h1>Ooops!</h1>
    <p>
      The page you are looking for does not exist.
    </p>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
  #page {
    height: 100%;
    padding-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
