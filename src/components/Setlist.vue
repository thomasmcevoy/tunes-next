<template>
  <div id="setlist" v-if="currentRoute === 'Setlist'">
    <ul v-for="setlistTune in setlist" :key="setlistTune.title">
      <SetlistTune :tune="setlistTune" />
    </ul>
  </div>
</template>

<script>
import SetlistTune from "./SetlistTune.vue";
import { mapState } from "vuex";

export default {
  name: "Setlist",
  components: {
    SetlistTune
  },
  computed: {
    ...mapState({
      setlist: state => state.setlist,
      currentRoute: state => state.currentRoute
    })
  }
};
</script>

<style scoped>
#setlist {
  overflow-y: hidden;
}
</style>
