<template>
  <div id="setlist" ref="setlist" v-if="currentRoute === 'Setlist'">
    <ul v-for="setlistTune in setlist" :key="setlistTune.title">
      <SetlistTune :tune="setlistTune" :scrollLock="scrollLock" :scrollUnlock="scrollUnlock" />
    </ul>
  </div>
</template>

<script>
import SetlistTune from './SetlistTune.vue'
import { mapState } from 'vuex'

export default {
  name: 'Setlist',
  components: {
    SetlistTune
  },
  computed: {
    ...mapState({
      setlist: state => state.setlist,
      currentRoute: state => state.currentRoute
    })
  },
  methods: {
    scrollLock () {
      const setlist = this.$refs.setlist
      if (!setlist.classList.contains('scrollLock')) {
        setlist.classList.add('scrollLock')
      }
    },
    scrollUnlock () {
      const setlist = this.$refs.setlist
      if (setlist.classList.contains('scrollLock')) {
        setlist.classList.remove('scrollLock')
      }
    }
  }
}
</script>

<style scoped>
#setlist.scrollLock {
  overflow-y: hidden;
}
</style>
