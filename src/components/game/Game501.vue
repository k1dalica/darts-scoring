<template>
  <div class="game">
    <Header>
      <router-link :to="{ name: 'Play' }">
        <vs-button
          color="#000"
          circle
          relief
        >
          New game
        </vs-button>
      </router-link>
      <router-link :to="{ name: 'Home' }">
        <vs-button
          icon
          circle
          flat
          info
        >
          <i class="bx bx-x" />
        </vs-button>
      </router-link>
    </Header>

    <div class="game-info">
      <div class="row">
        <span class="label">Sets</span>
        <span class="text">
          {{ set }}
          <small v-if="sets !== 'Unlimited'">/{{ sets }}</small>
        </span>
      </div>
      <div class="row xl">
        <span class="label">Game</span>
        <span class="text">{{ game }}</span>
      </div>
      <div class="row">
        <span class="label">Round</span>
        <span class="text">
          {{ round }}
          <small v-if="rounds !== 'Unlimited'">/{{ rounds }}</small>
        </span>
      </div>
    </div>

    <div class="scoreboard">
      <div class="players">
        <div
          v-for="player, index in players"
          :key="index"
          class="player"
          :class="{ selected: index === playersTurnIndex }"
        >
          <div class="info">
            <span class="index">{{ index + 1 }}.</span>
            <div class="player-info">
              <span class="name">
                {{ player.name }}
              </span>
              <span class="other">
                <span class="item">Avg: {{ player.avg }}</span>
                <span
                  v-if="player.wins"
                  class="item"
                >
                  Wins:
                  <i
                    v-for="w in player.wins"
                    :key="w"
                    class="bx bxs-crown"
                  />
                </span>
              </span>
            </div>
          </div>

          <span class="score">
            {{ player.score }}
          </span>
        </div>
      </div>

      <div class="history">
        <div
          v-for="item, index in history"
          :key="index"
          class="row"
        >
          <small>{{ index + 1 }}.</small> {{ item }}
        </div>
        <div class="row">
          <small>{{ history.length + 1 }}.</small>
          {{ value }}<typing-indicator
            v-if="value < 100"
            small
            dark
          />
        </div>
      </div>
    </div>

    <digits
      v-model="value"
      @submit="submit()"
    />

    <win-modal
      v-if="showWinner"
      :winner="winner"
      :set="set"
      :is-last-set="isLastSet"
      :players-with-most-wins="playersWithMostWins"
      @leave="leaveGame()"
      @nextSet="nextSet()"
      @replay="init()"
    />

    <resume-game-modal
      v-if="askResume"
      @cancel="cancelResume()"
      @resume="resumeGame()"
    />

    <confirm-leave-modal
      v-if="leavePrompt"
      @leave="leaveGame()"
      @close="leavePrompt = false"
    />
  </div>
</template>

<script>
import Digits from '../common/Digits'
import Header from '../layout/Header'
import WinModal from '../common/WinModal'
import ResumeGameModal from '../common/ResumeGameModal'
import TypingIndicator from '../common/TypingIndicator'
import ConfirmLeaveModal from '../common/ConfirmLeaveModal'

export default {
  name: 'Game501',

  beforeRouteLeave (to, from, next) {
    if (this.noGameSettings || this.leavePrompt || (this.set === 1 && this.round === 1 && this.playersTurnIndex === 0)) {
      window.localStorage.removeItem('autosave')
      return next()
    }

    this.leavePrompt = true
  },

  components: {
    Digits,
    Header,
    WinModal,
    ResumeGameModal,
    TypingIndicator,
    ConfirmLeaveModal
  },

  data () {
    return {
      value: null,
      winner: null,

      showWinner: false,
      leavePrompt: false,
      askResume: false,

      // GAME INFO
      set: 1,
      round: 1,
      playersTurnIndex: 0,
      players: []
    }
  },

  computed: {
    playingPlayer () {
      return this.players[this.playersTurnIndex]
    },

    history () {
      return this.playingPlayer?.history || []
    },

    game () {
      return this.$store.state.game.game
    },

    sets () {
      return this.$store.state.game.sets
    },

    rounds () {
      return this.$store.state.game.rounds
    },

    playerNames () {
      return this.$store.state.game.players
    },

    isLastSet () {
      return this.set === this.sets
    },

    playersWithMostWins () {
      const mostWins = this.players.reduce((user, current) => {
        return user?.wins > current?.wins ? user.wins : current.wins
      }, 0)

      return this.players.filter(player => player.wins === mostWins).map(player => player.name)
    },

    noGameSettings () {
      return !this.game || !this.sets || !this.rounds || !this.playerNames
    }
  },

  created () {
    if (this.$route.query.resume) return this.resumeGame()
    if (this.checkForAutosave()) return null

    if (this.noGameSettings) {
      return this.$router.push({ name: 'Play' })
    }

    this.init()
  },

  methods: {
    submit () {
      let val = this.value || 0

      if (val > this.playingPlayer.score) {
        val = 0
      }
      this.playingPlayer.score -= val
      this.playingPlayer.history.push(val)
      this.value = null

      if (this.playingPlayer.score === 0) {
        this.showWinnerModal()
        return
      }

      this.playingPlayer.avg = this.getPlayerAvg(this.playingPlayer)

      this.selectNextPlayer()

      this.saveGame()
    },

    getPlayerAvg (player) {
      const avg = player.history.reduce((a, b) => a + b) / player.history.length
      return avg ? parseInt(avg) : 0
    },

    selectNextPlayer () {
      this.checkAddRound()
      this.playersTurnIndex = (this.playersTurnIndex + 1) % this.players.length
      this.value = null
    },

    showWinnerModal () {
      const winner = this.players.reduce((user, current) => {
        return user?.score < current?.score ? user : current
      }, null)
      this.winner = winner
      const index = this.players.indexOf(winner)
      this.players[index].wins += 1
      this.showWinner = true
    },

    checkAddRound () {
      if (this.playersTurnIndex === this.players.length - 1) {
        this.nextRound()
      }
    },

    nextRound () {
      if (this.round === this.rounds) {
        return this.showWinnerModal()
      }
      this.round++
    },

    nextSet () {
      this.showWinner = false
      this.winner = null

      this.round = 1
      this.set++
      this.players.forEach(player => {
        player.score = this.game
        player.history = []
      })
      const firstPlayer = this.players.shift()
      this.players.push(firstPlayer)
      this.playersTurnIndex = 0
      this.value = null
    },

    saveGame () {
      const payload = {
        game: this.game,
        sets: this.sets,
        rounds: this.rounds,
        players: this.players,
        round: this.round,
        set: this.set,
        playersTurnIndex: this.playersTurnIndex,
        showWinner: this.showWinner,
        winner: this.winner
      }
      window.localStorage.setItem('autosave', JSON.stringify(payload))
    },

    init () {
      this.value = null
      this.round = 1
      this.set = 1
      this.playersTurnIndex = 0
      this.showWinner = false
      this.winner = null

      this.players = !this.playerNames ? [] : this.playerNames.map(player => ({
        name: player.name,
        score: this.game,
        history: [],
        wins: 0,
        avg: 0
      }))
    },

    checkForAutosave () {
      const autosave = window.localStorage.getItem('autosave')
      if (!autosave) return null

      this.askResume = true
      return true
    },

    resumeGame () {
      this.askResume = false
      const autosave = JSON.parse(window.localStorage.getItem('autosave'))

      this.$store.commit('game/set', {
        game: autosave.game,
        sets: autosave.sets,
        rounds: autosave.rounds,
        players: autosave.players
      })

      this.round = autosave.round
      this.set = autosave.set
      this.playersTurnIndex = autosave.playersTurnIndex
      this.showWinner = autosave.showWinner
      this.winner = autosave.winner
      this.players = autosave.players
    },

    cancelResume () {
      this.askResume = false
      window.localStorage.removeItem('autosave')
      this.leaveGame()
    },

    leaveGame () {
      this.$router.push({ name: 'Play' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .game {
    height: 100%;
    padding: 70px 0 0 0;
    box-sizing: border-box;
    .game-info {
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      .row {
        width: calc(100% / 3);
        text-align: center;
        .label {
          display: block;
          color: $black;
          font-weight: 400;
          font-size: 14px;
          line-height: 1;
          text-transform: uppercase;
        }
        .text {
          display: block;
          color: $black;
          font-size: 27px;
          font-weight: 900;
          line-height: 1;
          small {
            font-weight: 800;
            font-size: 18px;
            color: $tertiary;
          }
        }
        &.xl {
          .label {
            font-size: 16px;
          }
          .text {
            font-size: 39px;
          }
        }
      }
    }
    .scoreboard {
      display: flex;
      height: calc(100% - 280px - 55px);
      padding: 20px 10px 20px 10px;
      .players {
        width: calc(100% - 80px);
        height: 100%;
        overflow-y: auto;
        border-right: 1px solid #cdddef;
        padding: 10px 10px 0 0;
        .player {
          height: 45px;
          padding: 0 10px;
          border-radius: 10px;
          margin-bottom: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .info {
            display: flex;
            align-items: center;
            .index {
              font-weight: 700;
              font-size: 14px;
              color: $tertiary;
              margin-right: 7px;
            }
            .player-info {
              .name {
                display: block;
                font-size: 18px;
                font-weight: 500;
              }
              .other {
                font-size: 12px;
                font-weight: 400;
                color: $secondary;
                .item {
                  margin-right: 5px;
                }
              }
            }
          }
          .score {
            font-size: 20px;
            font-weight: 500;
            color: $secondary;
          }
          &.selected {
            background-color: $lighter;
            .score {
              color: $primary;
              font-size: 25px;
              font-weight: 600;
            }
          }
        }
      }
      .history {
        width: 80px;
        padding: 10px 0 10px 10px;
        max-height: 100%;
        overflow-y: auto;
        .row {
          color: $black;
          font-size: 20px;
          font-weight: 500;
          small {
            font-weight: 700;
            font-size: 14px;
            color: $tertiary;
          }
        }
      }
    }
  }
</style>
