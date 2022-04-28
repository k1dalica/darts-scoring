<template>
  <div id="play">
    <Header />

    <vs-alert
      v-if="hasAutoSave"
      gradient
    >
      <template #title>
        Resume game
      </template>
      Hello there! We've noticed that you have unfinished game. Would you like to resume it?
      <div class="flex-center">
        <vs-button
          danger
          @click="cancelResume()"
        >
          Cancel
        </vs-button>

        <vs-button
          dark
          shadow
          @click="resumeGame()"
        >
          Resume
        </vs-button>
      </div>
    </vs-alert>

    <label>Select game:</label>
    <div class="flex-center">
      <vs-button-group>
        <vs-button
          v-for="option in gameOptions"
          :key="option"
          flat
          :active="game === option"
          @click="game = option"
        >
          {{ option }}
        </vs-button>
      </vs-button-group>
    </div>

    <label class="mt-20">Rounds:</label>
    <div class="flex-center">
      <vs-button-group>
        <vs-button
          v-for="option in roundOptions"
          :key="option"
          flat
          :active="rounds === option"
          @click="rounds = option"
        >
          {{ option }}
        </vs-button>
      </vs-button-group>
    </div>

    <label class="mt-20">Sets:</label>
    <div class="flex-center">
      <vs-button-group>
        <vs-button
          v-for="set in setOptions"
          :key="set"
          flat
          :active="sets === set"
          @click="sets = set"
        >
          {{ set }}
        </vs-button>
      </vs-button-group>
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
      hasAutoSave: false,

      game: 501,
      rounds: 15,
      sets: 1,
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
      const payload = {
        game: this.game,
        sets: this.sets,
        rounds: this.rounds,
        players: this.players.map((player, index) => ({
          name: player.name || `Player ${index + 1}`
        }))
      }

      this.$store.commit('game/set', payload)

      window.localStorage.setItem('last-game-data', JSON.stringify(payload))
      window.localStorage.removeItem('autosave')

      this.$router.push({ name: 'Game' })
    },

    resumeGame () {
      this.$router.push({ name: 'Game', query: { resume: 'yes' } })
    },

    cancelResume () {
      this.hasAutoSave = false
      window.localStorage.removeItem('autosave')
      window.localStorage.getItem('autosave')
    },

    addPlayer () {
      this.players.push({
        name: ''
      })
    },

    removePlayer (index) {
      this.players.splice(index, 1)
    }
  },

  created () {
    this.hasAutoSave = !!window.localStorage.getItem('autosave')
    let lastGameData = window.localStorage.getItem('last-game-data')
    if (lastGameData) {
      lastGameData = JSON.parse(lastGameData)
      this.game = lastGameData.game
      this.sets = lastGameData.sets
      this.rounds = lastGameData.rounds
      this.players = lastGameData.players
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
