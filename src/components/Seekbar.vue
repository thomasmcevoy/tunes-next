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
import { useStore } from 'vuex'
import { reactive, computed, watchEffect } from 'vue'

export default {
  props: {
    markers: Array
  },
  setup (props, context) {
    const store = useStore()
    const state = reactive({
      sortBy: computed(() => store.state.sortBy),
      toggleSelected: computed(() => store.actions.toggleSelected),
      sortedFilteredTunes: computed(() => store.getters.sortedFilteredTunes),
      lastTarget: '',
      isVisible: false,
      seekbarNode: undefined,
      seekbarHeight: undefined,
      seekbarTopOffset: undefined,
      headerHeight: undefined,
      markerHeight: undefined,
      viewportHeight: undefined
    })

    watchEffect(() => {
      const headerNode = document.getElementsByTagName('header')[0]
      const seekbarNode = document.getElementById('seekbar-container')
      console.log('watchEffect', seekbarNode)

      state.seekbarNode = seekbarNode
      if (seekbarNode) {
        state.seekbarHeight = seekbarNode.clientHeight
        state.seekbarTopOffset = Math.floor(seekbarNode.getBoundingClientRect().top)
        state.headerHeight = headerNode.clientHeight
        state.markerHeight = seekbarNode.clientHeight / props.markers.length
        state.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      }
    })

    const shorten = marker => {
      if (state.sortBy !== 'Year') return marker
      else if (marker === '< 1900') return '<'
      else return marker.slice(2, -1)
    }

    const handlePan = e => {
      e.preventDefault()

      const touchPosition = e.center.y - state.seekbarTopOffset
      const touchedMarkerIndex = Math.floor(touchPosition / state.markerHeight)
      const targetNode = document.getElementById(props.markers[touchedMarkerIndex])
      const targetOffset = targetNode.offsetTop - state.headerHeight

      if (targetNode !== state.lastTarget) {
        window.scrollTo(0, targetOffset)
        state.lastTarget = targetNode
      }
    }

    const handlePanStart = () => {
      state.isVisible = true
    }

    const handlePanEnd = () => {
      state.isVisible = false
    }

    return {
      seekbarNode: computed(() => state.seekbarHeight),
      isVisible: computed(() => state.isVisible),
      shorten,
      handlePan,
      handlePanStart,
      handlePanEnd
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
