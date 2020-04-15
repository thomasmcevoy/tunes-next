<template>
  <div id="tunes">
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
    <Seekbar :markers="markers" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed, toRefs } from 'vue'
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
      tunes: computed(() => store.getters.sortedFilteredTunes),
      groupedTunes: computed(() => getGroupedTunes()),
      markers: computed(() => getMarkers())
    })

    const getMarker = tune => {
      if (state.sortBy === 'Year') {
        return (tune.year < 1900) ? '< 1900' : String(tune.year).slice(0, -1).concat('0s')
      } else {
        const firstChar = tune[state.sortBy.toLowerCase()][0]
        return ('0123456789'.includes(firstChar)) ? '#' : firstChar
      }
    }

    const getMarkers = () => {
      const result = []
      state.tunes.forEach(tune => {
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
      state.tunes.forEach(tune => {
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
      console.log('groupedTunes: ', result)
      return result
    }

    return {
      ...toRefs(state)
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
