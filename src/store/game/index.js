
const state = {
  game: null,
  rounds: null,
  sets: null,
  players: null
}

const getters = {}

const actions = {}

const mutations = {
  set (state, { game, rounds, sets, players }) {
    state.game = game
    state.rounds = rounds
    state.sets = sets
    state.players = players
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
