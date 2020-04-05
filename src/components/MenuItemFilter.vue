<template>
  <li
    class="menu-item"
    @click="setFilter(filter)"
    v-bind:class="{ active: filter === currentFilter }"
  >
    {{ filter }}
  </li>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'MenuItemFilter',
  props: {
    filter: String
  },
  methods: {
    ...mapActions(['setFilter'])
  },
  computed: {
    ...mapState({
      currentFilter: state => state.filter
    })
  }
}
</script>

<style scoped></style>
