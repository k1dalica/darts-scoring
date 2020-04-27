<template>
  <div class="content">
    <div class="round">
      Round: <b>{{ round }}</b>
    </div>
    <div class="wrapper">
      <div
        v-for="(player, index) in players"
        :key="player.name + index"
        class="card"
      >
        <div class="label">
          {{ player.name }}
        </div>
        <h1>{{ player.score }}</h1>

        <div class="holder">
          <input
            v-if="turn === index"
            type="number"
            :ref="`input` + index"
            v-model="value"
            controls-position="right"
            class="input"
            :min="0"
            :max="max"
            @keydown.enter="submit()"
          >
        </div>

        <template v-if="player.history.length">
          <div class="history">
            <el-tag
              v-for="(score, idx) in player.history"
              :key="idx"
              :type="getTagColor(score)"
              effect="dark"
              class="tag"
            >
              {{ score }}
            </el-tag>
          </div>

          <div class="avg">
            Avg: <b>{{ getAvg(player.history) }}</b>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    settings: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      round: 1,
      turn: -1,
      value: null,
      max: 180,
      players: []
    }
  },

  watch: {
    round (val) {
      if (this.settings.rounds !== 'Unlimited' && val > this.settings.rounds) {
        setTimeout(() => {
          this.$confirm('Do you want to start a new game?', 'Game Over', {
            confirmButtonText: 'Restart',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => this.init()).catch(() => this.$emit('stop'))
        }, 200)
      }
    }
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      this.round = 1
      this.turn = -1
      this.value = null
      this.players = this.settings.players.map(item => {
        return {
          name: item.name,
          score: this.settings.game,
          history: []
        }
      })
      this.next()
    },

    submit () {
      const value = parseInt(this.value)
      if (typeof value === 'number' && value >= 0 && value <= this.max) {
        const s = this.players[this.turn].score
        if (s - value > 0) {
          this.players[this.turn].score -= value
          this.players[this.turn].history.push(value)
          this.value = null
          this.next()
        }
        if (s - value === 0) {
          setTimeout(() => {
            this.$confirm('Do you want to start a new game?', `${this.players[this.turn].name} Won`, {
              confirmButtonText: 'Restart',
              cancelButtonText: 'No',
              type: 'warning'
            }).then(() => this.init()).catch(() => this.$emit('stop'))
          }, 200)
        }
      }
    },

    next () {
      if (this.turn + 1 > this.players.length - 1) {
        this.turn = 0
        this.round++
      } else {
        this.turn++
      }

      this.$nextTick(() => this.$refs['input' + this.turn][0].focus())
    },

    getTagColor (score) {
      if (score === 180) return 'success'
      if (score >= 120) return 'primary'
      if (score >= 60) return 'warning'
      return 'danger'
    },

    getAvg (scores) {
      return Math.round(scores.reduce((acc, val) => acc + val, 0) / scores.length) || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // align-items: center;
}
.content {
  width: 100%;
  display: block;
  .round {
    color: #fff;
    text-align: center;
    font-size: 40px;
    margin-bottom: 40px;
    b {
      font-size: 80px;
      font-weight: 800;
    }
  }
  .card {
    min-width: 250px;
    display: inline-block;
    vertical-align: top;
    margin: 10px;
    .label {
      margin-top: 0;
      font-size: 30px;
    }
    h1 {
      font-weight: 800;
      font-size: 70px;
      margin-bottom: 30px;
    }
    .holder {
      height: 40px;
      .input {
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 30px;
        background-color: #000;
        border: none;
        border-radius: 5px;
        outline: none;
        color: #fff;
      }
    }
    .history {
      margin: 30px 0 0 0;
      padding: 0;
      display: block;
      color: #fff;
      padding: 5px 0;
    }
  }
  .tag {
    margin: 2px;
  }
  .avg {
    color: #fff;
    margin-top: 10px;
    line-height: 20px;
    b {
      font-weight: 800;
      font-size: 18px;
    }
  }
}
</style>
