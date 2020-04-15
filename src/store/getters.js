import { FILTERS } from '../constants/filters'
import { SORTBYS } from '../constants/sortBys'
import jazzComposers from '../constants/jazzComposers.js'
import standardsComposers from '../constants/standardsComposers.js'

function wasComposedBy (tune, list) {
  return tune.composer.split(/[,&/]/).some(composer => list.includes(composer.trim()))
}

export function filter (tunes, filterBy) {
  return tunes.filter(tune => {
    switch (filterBy) {
      case FILTERS.all: return true
      case FILTERS.latin: return tune.latin
      case FILTERS.blues: return tune.blues
      case FILTERS.minor: return tune.minor
      case FILTERS.waltzes: return tune.waltz
      case FILTERS.ballads: return tune.ballad
      case FILTERS.holiday: return tune.holiday
      case FILTERS.contrafacts: return tune.contrafact
      case FILTERS.rhythm: return tune.rhythm
      case FILTERS.miles: return tune.miles || tune.composer.includes('Miles Davis')
      case FILTERS.sinatra: return tune.sinatra || tune.composer.includes('Sinatra')
      case FILTERS.standards: return wasComposedBy(tune, standardsComposers)
      case FILTERS.jazz: return wasComposedBy(tune, jazzComposers)
      default: return false
    }
  })
}

function letterSort (a, b, sortBy) {
  const index = sortBy.toLowerCase()
  if (a[index] < b[index]) return -1
  if (a[index] > b[index]) return 1
  else return 0
}

export function sort (tunes, sortBy) {
  return tunes.sort((a, b) => {
    switch (sortBy) {
      case SORTBYS.year: return a.year - b.year
      default: return letterSort(a, b, sortBy)
    }
  })
}

export const getters = {
  filteredTunes: state => filter(state.tunes, state.filter),
  sortedFilteredTunes: state => sort(filter(state.tunes, state.filter), state.sortBy)
}
