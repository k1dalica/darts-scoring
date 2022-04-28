<template>
  <div id="home">
    <Header transparent>
      <router-link :to="{ name: 'Play' }">
        <vs-button
          circle
          relief
        >
          Play
        </vs-button>
      </router-link>
    </Header>

    <h1>Darts Scoring</h1>
    <h2>Simple and easy to use application for darts scoring.</h2>
    <router-link :to="{ name: 'Play' }">
      <vs-button
        size="xl"
        class="button"
        circle
        relief
      >
        Play
      </vs-button>
    </router-link>
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
  #home {
    height: 100%;
    background-image: url(../../assets/images/bg.jpg);
    background-size: cover;
    background-position: center;
    padding: 60px 20px 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: $white;
    text-align: center;
    h1 {
      font-size: 35px;
      text-transform: uppercase;
    }
    h2 {
      margin-top: 10px;
      font-size: 20px;
      font-weight: 300;
    }
    .button {
      margin-top: 20px;
      padding: 0 30px;
    }
  }
</style>
