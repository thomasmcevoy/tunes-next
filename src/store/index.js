import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { VueHammer } from 'vue2-hammer'
import localTunes from '../assets/localTunes.js'
import jazzComposers from '../assets/jazzComposers.js'
import standardsComposers from '../assets/standardsComposers.js'

Vue.use(Vuex)
Vue.use(VueHammer)
Vue.config.devtools = true
Vue.config.productionTip = false

const URL = 'https://thomasmcevoy.github.io/tunes-api'

function filter (tunes, filterBy) {
  return tunes.filter(tune => {
    switch (filterBy) {
      case 'All':
        return true
      case 'Latin':
        return tune.latin
      case 'Blues':
        return tune.blues
      case 'Minor':
        return tune.minor
      case 'Waltzes':
        return tune.waltz
      case 'Ballads':
        return tune.ballad
      case 'Holiday':
        return tune.holiday
      case 'Contrafacts':
        return tune.contrafact
      case 'Rhythm':
        return tune.rhythm
      case 'Miles':
        return tune.miles || tune.composer.includes('Miles Davis')
      case 'Sinatra':
        return tune.sinatra || tune.composer.includes('Sinatra')
      case 'Standards':
        return tune.composer
          .split(/[,&/]/)
          .some(composer => standardsComposers.includes(composer.trim()))
      case 'Jazz tunes':
        return tune.composer
          .split(/[,&/]/)
          .some(composer => jazzComposers.includes(composer.trim()))
      default:
        return false
    }
  })
}

function sort (tunes, sortBy) {
  return tunes.sort((a, b) => {
    if (sortBy === 'Year') return a.year - b.year
    else {
      if (a[sortBy.toLowerCase()] < b[sortBy.toLowerCase()]) { return -1 }
      if (a[sortBy.toLowerCase()] > b[sortBy.toLowerCase()]) { return 1 }
      return 0
    }
  })
}

export default new Vuex.Store({
  state: {
    tunes: [],
    setlist: [],
    filter: 'All',
    sortBy: 'Title',
    menuIsOpen: false,
    currentRoute: 'Tunes'
  },
  getters: {
    filteredTunes: state => {
      return filter(state.tunes, state.filter)
    },
    sortedFilteredTunes: state => {
      return sort(filter(state.tunes, state.filter), state.sortBy)
    }
  },
  mutations: {
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
  },
  actions: {
    loadTunes ({ commit }) {
      if (process.env.NODE_ENV === 'development') {
        commit('setTunes', localTunes)
      } else {
        axios
          .get(URL)
          .then(response => commit('setTunes', response.data))
          .catch(error => {
            commit('setTunes', localTunes)
            console.log('Error connecting to Tunes API, loading local tunelist.')
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
})
