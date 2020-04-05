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
    <Seekbar :markers="markers" />
  </div>
</template>

<script>
import Tune from './Tune.vue'
import Seekbar from './Seekbar.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Tunes',
  components: {
    Tune,
    Seekbar
  },
  methods: {
    ...mapActions(['setMarkers']),
    getMarker (tune) {
      if (this.sortBy === 'Year') {
        if (tune.year < 1900) return '< 1900'
        else {
          return String(tune.year)
            .slice(0, -1)
            .concat('0s')
        }
      } else {
        const char = tune[this.sortBy.toLowerCase()][0]
        if ('0123456789'.includes(char)) return '#'
        else return char
      }
    }
  },
  computed: {
    ...mapGetters(['sortedFilteredTunes']),
    ...mapState({
      sortBy: state => state.sortBy,
      currentRoute: state => state.currentRoute
    }),
    markers () {
      const result = []
      this.sortedFilteredTunes.forEach(tune => {
        const currentMarker = this.getMarker(tune)
        if (result.indexOf(currentMarker) === -1) {
          result.push(currentMarker)
        }
      })
      return result
    },
    groupedTunes () {
      const result = []
      let currentMarker = ''
      this.sortedFilteredTunes.forEach(tune => {
        const marker = this.getMarker(tune)
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
