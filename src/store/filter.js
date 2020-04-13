import { FILTERS } from '../constants/filters'
import jazzComposers from '../constants/jazzComposers.js'
import standardsComposers from '../constants/standardsComposers.js'

function isComposedBy (tune, list) {
  return tune.composer.split(/[,&/]/).some(composer => list.includes(composer.trim()))
}

export default function filter (tunes, filterBy) {
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
      case FILTERS.standards: return isComposedBy(tune, standardsComposers)
      case FILTERS.jazz: return isComposedBy(tune, jazzComposers)
      default: return false
    }
  })
}
