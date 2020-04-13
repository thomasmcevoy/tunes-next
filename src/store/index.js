import { createStore } from 'vuex'
import axios from 'axios'
import sort from './sort'
import filter from './filter'
import localTunes from '../constants/localTunes'

const URL = 'https://thomasmcevoy.github.io/tunes-api'

const state = {
  tunes: localTunes,
  setlist: [],
  filter: 'All',
  sortBy: 'Title',
  menuIsOpen: false,
  currentRoute: 'Tunes'
}

const getters = {
  filteredTunes: state => {
    return filter(state.tunes, state.filter)
  },
  sortedFilteredTunes: state => {
    return sort(filter(state.tunes, state.filter), state.sortBy)
  }
}

const mutations = {
  setTunes (state, tunes) {
    state.tunes = tunes
  },
  setRoute (state, route) {
    state.currentRoute = route
  },
  setFilter (state, filter) {
    state.filter = filter
  },
  setSortBy (state, sortBy) {
    state.sortBy = sortBy
  },
  openMenu (state) {
    state.menuIsOpen = true
  },
  closeMenu (state) {
    state.menuIsOpen = false
  },
  addToSetlist (state, tune) {
    state.setlist.push(tune)
  },
  removeFromSetlist (state, tune, index) {
    if (index === undefined) {
      index = state.setlist.indexOf(tune)
    }
    state.setlist.splice(index, 1)
  }
}

const actions = {
  loadTunes ({ commit }) {
    if (process.env.NODE_ENV === 'production') {
      axios
        .get(URL)
        .then(response => commit('setTunes', response.data))
        .catch(error => {
          commit('setTunes', localTunes)
          console.log('Error connecting to Tunes API, using local tunelist.')
          console.log(error)
        })
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
  },
  openMenu ({ commit }) {
    commit('openMenu')
  },
  closeMenu ({ commit }) {
    commit('closeMenu')
  }
}

export default createStore({
  state,
  getters,
  mutations,
  actions
})
