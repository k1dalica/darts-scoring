<template>
  <div class="wrapper">
    <settings
      v-if="!started"
      v-model="settings"
      @start="start()"
    />

    <template v-if="started">
      <minus
        :settings="settings"
        @stop="started = false"
      />
    </template>
  </div>
</template>

<script>
import Minus from './Minus'
import Settings from './Settings'

export default {
  components: {
    Minus,
    Settings
  },

  data () {
    return {
      started: false,
      settings: {
        rounds: 15,
        game: 501,
        players: []
      }
    }
  },

  created () {
    const settings = localStorage.getItem('settings')
    if (settings) {
      this.settings = JSON.parse(settings)
    } else {
      this.addPlayer()
    }
  },

  methods: {
    start () {
      this.started = true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  padding: 100px 50px;
  display: flex;
  justify-content: center;
}
</style>
