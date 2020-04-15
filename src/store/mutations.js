export const mutations = {
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
