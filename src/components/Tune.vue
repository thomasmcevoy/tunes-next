<template>
  <li
    class="tune"
    v-bind:class="{ selected: setlist.indexOf(tune) >= 0 }"
    @click="toggleSelected(tune)"
  >
    <div class="title">{{ tune.title }}</div>
    <div class="detail">{{ tune.composer }} ({{ tune.year }})</div>
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Tune',
  props: {
    tune: Object
  },
  computed: {
    ...mapState({
      setlist: state => state.setlist
    })
  },
  methods: {
    ...mapActions(['addToSetlist', 'removeFromSetlist']),
    toggleSelected (tune) {
      if (this.setlist.indexOf(tune) === -1) {
        this.addToSetlist(tune)
      } else {
        this.removeFromSetlist(tune)
      }
    }
  }
}
</script>

<style scoped>
.tune {
  margin-bottom: 0.125em;
  padding: 3vw 2.5vw;
  background: white;
  color: #222;
  user-select: none;
  page-break-inside: avoid;
  -webkit-tap-highlight-color: transparent;
}
@media (min-width: 500px) {
  .tune {
    padding: 1.125em 2.75vw;
  }
}

.tune:hover {
  cursor: pointer;
}

.tune.selected {
  background-color: #e1eff8;
}

.tune .title {
  font-size: 1.25em;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.05em;
}

.tune .detail {
  font-size: 0.75em;
}
</style>
