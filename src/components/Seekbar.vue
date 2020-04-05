<template>
  <div
    id="seekbar-container"
    v-hammer:pan.vertical="handlePan"
    v-hammer:panstart="handlePanStart"
    v-hammer:panend="handlePanEnd"
  >
    <ol id="seekbar" v-bind:class="{ isVisible: isVisible }">
      <li
        class="seekbar-marker"
        v-for="marker in markers"
        :marker="marker"
        :key="marker"
      >
        {{ shorten(marker) }}
      </li>
    </ol>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Seekbar',
  props: {
    markers: Array
  },
  data () {
    return {
      isVisible: false,
      lastTarget: ''
    }
  },
  computed: {
    ...mapGetters(['sortedFilteredTunes']),
    ...mapState({
      sortBy: state => state.sortBy
    }),
    seekbarNode () {
      return document.getElementById('seekbar-container')
    },
    seekbarTopOffset () {
      return Math.floor(this.seekbarNode.getBoundingClientRect().top)
    },
    seekbarHeight () {
      return this.seekbarNode.clientHeight
    },
    headerHeight () {
      return document.getElementsByTagName('header')[0].clientHeight
    },
    markerHeight () {
      return this.seekbarHeight / this.markers.length
    },
    viewportHeight () {
      return Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      )
    }
  },
  methods: {
    ...mapActions(['toggleSelected']),
    shorten (marker) {
      if (this.sortBy !== 'Year') {
        return marker
      } else if (marker === '< 1900') {
        return '<'
      } else {
        return marker.slice(2, -1)
      }
    },
    handlePan (e) {
      e.preventDefault()
      const touchPosition = e.center.y - this.seekbarTopOffset
      const touchedMarkerIndex = Math.floor(touchPosition / this.markerHeight)
      const targetNode = document.getElementById(
        this.markers[touchedMarkerIndex]
      )
      const targetOffset = targetNode.offsetTop - this.headerHeight
      if (targetNode !== this.lastTarget && !this.timeout) {
        window.scrollTo(0, targetOffset)
        this.lastTarget = targetNode
      }
    },
    handlePanStart () {
      this.isVisible = true
    },
    handlePanEnd () {
      this.isVisible = false
    }
  }
}
</script>

<style scoped>
#seekbar-container {
  z-index: 3;
  position: fixed;
  bottom: 12%;
  right: 0;
  width: 2.5em;
  height: calc(74% - var(--header-height-mobile));
}

#seekbar {
  z-index: 2;
  position: relative;
  right: -3em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  height: 100%;
  width: 1.25em;
  transition: 0.2s all;
}

#seekbar.isVisible {
  right: -1.25em;
}

.seekbar-marker {
  font-size: 0.75em;
  font-weight: bold;
}
</style>
