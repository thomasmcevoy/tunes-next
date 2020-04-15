<template>
  <div id="menu" v-bind:class="{ isOpen: isOpen }" v-hammer:swipe.up="closeMenu">
    <div class="menu-button" @click="closeMenu">×</div>
    <section>
      <h2>Sort</h2>
      <ul>
        <MenuItem
          v-for="item in sortBys"
          v-bind:key="item"
          :item="item"
          :activeItem="sortedBy"
          :action="setSortBy"
        />
      </ul>
    </section>
    <section>
      <h2>Filter</h2>
      <ul>
        <MenuItem
          v-for="item in filters"
          v-bind:key="item"
          :item="item"
          :activeItem="filteredBy"
          :action="setFilter"
        />
      </ul>
    </section>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import { mapActions, mapState } from 'vuex'
import { FILTERS } from '../constants/filters'
import { SORTBYS } from '../constants/sortBys'

export default {
  name: 'Menu',
  components: {
    MenuItem
  },
  props: {
    isOpen: Boolean
  },
  methods: {
    ...mapActions(['setSortBy', 'setFilter']),
    closeMenu () {
      this.$emit('closeMenu')
    }
  },
  computed: {
    ...mapState({
      sortedBy: state => state.sortBy,
      filteredBy: state => state.filter
    })
  },
  data () {
    return {
      sortBys: Object.values(SORTBYS),
      filters: Object.values(FILTERS)
    }
  }
}
</script>

<style scoped>
#menu {
  z-index: 4;
  position: fixed;
  top: -1000px;
  left: 0;
  padding-bottom: var(--header-height-mobile);
  width: 100%;
  height: 100%;
  background-color: var(--inner-background-color);
  color: #222;
  transition: 0.2s all;
}
#menu.isOpen {
  top: 0;
}
@media (min-width: 480px) {
  #menu {
    padding-bottom: var(--header-height-wide);
  }
}

#menu section {
  margin: 8vh auto 0;
  max-width: 35em;
}

#menu h2 {
  margin-bottom: 0;
}

.menu-button {
  position: absolute;
  top: 0;
  right: 0;
  height: var(--header-height-mobile);
  width: 0.85em;
  color: var(--header-inactive-color);
  font-size: 2.75em;
  line-height: 1;
}
@media (min-width: 480px) {
  .menu-button {
    height: var(--header-height-wide);
    width: var(--header-height-wide);
  }
}
.menu-button:hover {
  cursor: pointer;
}
.menu-button path {
  fill: var(--header-inactive-color);
}
.menu-button.active path {
  fill: var(--header-active-color);
}

.menu-item {
  display: inline-block;
  margin: 1vh 2vw;
  padding: 1vh 2vw;
  font-size: 1.1em;
  letter-spacing: 0.01em;
  list-style-type: none;
  color: #999;
}
.menu-item.active {
  color: #444;
  font-weight: 700;
  font-size: 1.1em;
  letter-spacing: -0.02em;
}
.menu-item:hover {
  cursor: pointer;
}
</style>
