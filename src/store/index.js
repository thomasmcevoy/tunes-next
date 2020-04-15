import Vuex from 'vuex'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import localTunes from '../constants/localTunes'

export const createStore = (state = {
  tunes: localTunes,
  setlist: [],
  filter: 'All',
  sortBy: 'Title',
  currentRoute: 'Tunes'
}) =>
  new Vuex.Store({ state, actions, mutations, getters })
