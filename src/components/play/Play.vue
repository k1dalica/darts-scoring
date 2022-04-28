<template>
  <div id="play">
    <Header />

    <label>Select game:</label>

    <div class="flex-center">
      <vs-button
        v-for="option in gameOptions"
        :key="option"
        flat
        :active="game === option"
        @click="game = option"
      >
        {{ option }}
      </vs-button>
    </div>

    <label class="mt-20">Rounds:</label>

    <div class="flex-center">
      <vs-button
        v-for="option in roundOptions"
        :key="option"
        flat
        :active="rounds === option"
        @click="rounds = option"
      >
        {{ option }}
      </vs-button>
    </div>

    <label class="mt-20">Sets:</label>

    <div class="flex-center">
      <vs-button
        v-for="set in setOptions"
        :key="set"
        flat
        :active="sets === set"
        @click="sets = set"
      >
        {{ set }}
      </vs-button>
    </div>

    <label class="mt-20">Players:</label>
    <div
      v-for="(player, index) in players"
      :key="index"
      class="flex mt-10"
    >
      <vs-input
        v-model="player.name"
        :placeholder="`Player ${index + 1} Name`"
      />
      <vs-button
        v-if="players.length > 1"
        size="mini"
        circle
        icon
        flat
        class="shrink-none"
        @click="removePlayer(index)"
      >
        <i class="bx bx-x" />
      </vs-button>
    </div>

    <div class="flex-center mt-10">
      <vs-button
        transparent
        icon
        @click="addPlayer()"
      >
        <i class="bx bx-user-plus mr-5" /> Add Player
      </vs-button>
    </div>

    <div class="flex-center mt-10">
      <vs-button
        size="xl"
        class="play-btn"
        @click="start()"
      >
        Play
      </vs-button>
    </div>
  </div>
</template>

<script>
import Header from '../layout/Header'

export default {
  components: {
    Header
  },

  data () {
    return {
      game: 501,
      rounds: 15,
      sets: 2,
      players: [
        {
          name: ''
        },
        {
          name: ''
        }
      ],

      setOptions: [1, 2, 3, 5, 'Unlimited'],
      gameOptions: [101, 301, 501, 1001],
      roundOptions: [15, 20, 'Unlimited']
    }
  },

  methods: {
    start () {
      this.$store.commit('game/set', {
        game: this.game,
        sets: this.sets,
        rounds: this.rounds,
        players: this.players
      })

      this.$router.push({ name: 'Game' })
    },

    addPlayer () {
      this.players.push({
        name: ''
      })
    },

    removePlayer (index) {
      this.players.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  #play {
    padding: 80px 20px 30px 20px;
    label {
      display: block;
      font-size: 16px;
      margin-bottom: 5px;
      text-align: center;
    }
    .play-btn {
      padding: 0 40px;
    }
  }
</style>
