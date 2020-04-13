<template>
  <div id="tunes" v-if="currentRoute === 'Tunes'">
    <ul>
      <li v-for="group in groupedTunes" :key="group.marker">
        <div v-bind:id="group.marker">
          <div class="marker">{{ group.marker }}</div>
          <ul>
            <Tune :tune="tune" v-for="tune in group.tunes" :key="tune.title" />
          </ul>
        </div>
      </li>
    </ul>
    <Seekbar :markers="markers()" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'
import Tune from './Tune.vue'
import Seekbar from './Seekbar.vue'

export default {
  components: {
    Tune,
    Seekbar
  },
  setup () {
    const store = useStore()
    const state = reactive({
      sortBy: computed(() => store.state.sortBy),
      currentRoute: computed(() => store.state.currentRoute),
      sortedFilteredTunes: computed(() => store.getters.sortedFilteredTunes),
      groupedTunes: computed(() => getGroupedTunes())
    })

    const getMarker = tune => {
      if (state.sortBy === 'Year') {
        if (tune.year < 1900) return '< 1900'
        else return String(tune.year).slice(0, -1).concat('0s')
      } else {
        const char = tune[state.sortBy.toLowerCase()][0]
        if ('0123456789'.includes(char)) return '#'
        else return char
      }
    }

    const markers = () => {
      const result = []
      state.sortedFilteredTunes.forEach(tune => {
        const currentMarker = getMarker(tune)
        if (result.indexOf(currentMarker) === -1) {
          result.push(currentMarker)
        }
      })
      return result
    }

    const getGroupedTunes = () => {
      const result = []
      let currentMarker = ''
      state.sortedFilteredTunes.forEach(tune => {
        const marker = getMarker(tune)
        if (marker !== currentMarker) {
          currentMarker = marker
          result.push({
            marker: currentMarker,
            tunes: []
          })
        }
        result[result.length - 1].tunes.push(tune)
      })
      return result
    }

    return {
      sortBy: computed(() => state.sortBy),
      currentRoute: computed(() => state.currentRoute),
      sortedFilteredTunes: computed(() => state.sortedFilteredTunes),
      groupedTunes: computed(() => state.groupedTunes),
      getMarker,
      markers
    }
  }
}
</script>

<style scoped>
#tunes {
  margin: 0;
  border: 0;
  padding: 0;
}

#tunes .marker {
  position: -webkit-sticky;
  position: sticky;
  top: var(--header-height-mobile);
  background-color: var(--inner-background-color);
  font-weight: bold;
}
@media (min-width: 480px) {
  #tunes .marker {
    top: var(--header-height-wide);
  }
}
</style>
