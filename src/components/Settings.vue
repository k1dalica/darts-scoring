<template>
  <div class="card">
    <h1>Darts Scoring</h1>

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

    <div class="label">
      Rounds
    </div>
    <el-button-group>
      <el-button
        v-for="item in rounds"
        :key="item"
        :type="settings.rounds === item ? 'primary' : ''"
        size="medium"
        round
        @click="settings.rounds = item"
      >
        {{ item }}
      </el-button>
    </el-button-group>

    <div class="label">
      Add Players
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        circle
        @click="addPlayer()"
      />
    </div>
    <div
      v-for="(player, index) in settings.players"
      :key="index"
      class="player-input"
    >
      <el-input
        v-model="settings.players[index].name"
        :placeholder="`Player ${index + 1} name`"
      >
        <el-button
          v-if="settings.players.length > 1"
          slot="append"
          type="info"
          icon="el-icon-close"
          @click="removePlayer(index)"
        />
      </el-input>
    </div>
    <el-button
      class="submit"
      type="success"
      @click="$emit('start')"
    >
      Play
    </el-button>
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
