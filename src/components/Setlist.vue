<template>
  <div id="setlist" ref="setlist">
    <ul
      v-for="setlistTune in setlist"
      :key="setlistTune.title"
    >
      <SetlistTune
        :tune="setlistTune"
        :scrollLock="scrollLock"
        :scrollUnlock="scrollUnlock"
      />
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import SetlistTune from './SetlistTune.vue'

export default {
  components: { SetlistTune },
  setup () {
    const store = useStore()
    const setlist = ref(store.state.setlist)

    onMounted(() => {
      console.log(this.$refs)
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
      setlist,
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
