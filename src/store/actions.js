import axios from 'axios'

const URL = 'https://thomasmcevoy.github.io/tunes-api'

export const actions = {
  onLoad ({ commit }) {
    if (process.env.NODE_ENV === 'production') {
      axios
        .get(URL)
        .then(response => commit('setTunes', response.data))
        .catch(error => console.log('Error connecting to Tunes API, using local tunelist: ', error))
    }
  },
  setRoute ({ commit }, route) {
    commit('setRoute', route)
  },
  setFilter ({ commit }, filter) {
    commit('setFilter', filter)
  },
  setSortBy ({ commit }, sortBy) {
    commit('setSortBy', sortBy)
  },
  addToSetlist ({ commit }, tune, index) {
    commit('addToSetlist', tune, index)
  },
  removeFromSetlist ({ commit }, tune) {
    commit('removeFromSetlist', tune)
  }
}
