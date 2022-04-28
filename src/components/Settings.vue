<template>
  <div class="card">
    <h1>Darts 501 Scoring</h1>

    <div class="label">
      Choose Game
    </div>
    <el-button-group>
      <el-button
        v-for="item in games"
        :key="item"
        :type="settings.game === item ? 'primary' : ''"
        size="medium"
        round
        @click="settings.game = item"
      >
        {{ item }}
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      games: [101, 201, 301, 401, 501],
      rounds: [15, 20, 'Unlimited']
    }
  },

  computed: {
    settings: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },

  watch: {
    settings: {
      handler (value) {
        localStorage.setItem('settings', JSON.stringify(value))
      },
      deep: true
    }
  },
  methods: {
    addPlayer () {
      this.settings.players.push({
        name: ''
      })
    },

    removePlayer (idx) {
      this.settings.players.splice(idx, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .submit {
    margin-top: 30px;
    width: 100%;
    font-size: 15px;
    text-transform: uppercase;
  }
  .player-input {
    margin-bottom: 10px;
  }
</style>
