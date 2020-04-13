<template>
  <div id="setlist" ref="setlist" v-if="currentRoute === 'Setlist'">
    <ul v-for="setlistTune in setlist" :key="setlistTune.title">
      <SetlistTune :tune="setlistTune" :scrollLock="scrollLock" :scrollUnlock="scrollUnlock" />
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
import SetlistTune from './SetlistTune.vue'

export default {
  components: { SetlistTune },
  setup () {
    const store = useStore()
    const state = reactive({
      setlist: computed(() => store.state.setlist),
      currentRoute: computed(() => store.state.currentRoute)
    })

    const scrollLock = () => {
      const setlist = this.$refs.setlist
      if (!setlist.classList.contains('scrollLock')) {
        setlist.classList.add('scrollLock')
      }
    }

    const scrollUnlock = () => {
      const setlist = this.$refs.setlist
      if (setlist.classList.contains('scrollLock')) {
        setlist.classList.remove('scrollLock')
      }
    }

    return {
      currentRoute: computed(() => state.currentRoute),
      setlist: computed(() => state.setlist),
      scrollLock,
      scrollUnlock
    }
  }
}
</script>

<style scoped>
#setlist.scrollLock {
  overflow-y: hidden;
}
</style>
