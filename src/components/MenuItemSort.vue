<template>
  <li
    class="menu-item"
    @click="setSortBy(sortBy)"
    v-bind:class="{ active: sortBy === currentSortBy }"
  >
    {{ sortBy }}
  </li>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "MenuItemSort",
  props: {
    sortBy: String
  },
  methods: {
    ...mapActions(["setSortBy"])
  },
  computed: {
    ...mapState({
      currentSortBy: state => state.sortBy
    })
  }
};
</script>

<style scoped></style>
