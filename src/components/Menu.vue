<template>
  <div
    id="menu"
    v-bind:class="{ isOpen: menuIsOpen }"
    v-hammer:swipe.up="closeMenu"
  >
    <div class="menu-button" @click="closeMenu()">×</div>
    <section>
      <h2>Sort</h2>
      <ul>
        <MenuItemSort
          :sortBy="sortBy"
          v-bind:key="sortBy"
          v-for="sortBy in sortBys"
        />
      </ul>
    </section>
    <section>
      <h2>Filter</h2>
      <ul>
        <MenuItemFilter
          :filter="filter"
          v-bind:key="filter"
          v-for="filter in filters"
        />
      </ul>
    </section>
  </div>
</template>

<script>
import MenuItemFilter from "./MenuItemFilter.vue";
import MenuItemSort from "./MenuItemSort.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "Menu",
  components: {
    MenuItemSort,
    MenuItemFilter
  },
  methods: {
    ...mapActions(["toggleMenu", "closeMenu"])
  },
  computed: {
    ...mapState({
      menuIsOpen: state => state.menuIsOpen
    })
  },
  data() {
    return {
      sortBys: ["Title", "Composer", "Year"],
      filters: [
        "All",
        "Jazz tunes",
        "Standards",
        "Blues",
        "Rhythm",
        "Ballads",
        "Waltzes",
        "Latin",
        "Contrafacts",
        "Minor",
        "Miles",
        "Sinatra",
        "Holiday"
      ]
    };
  }
};
</script>

<style scoped>
#menu {
  z-index: 4;
  position: fixed;
  top: -1000px;
  left: 0;
  padding-bottom: var(--header-height-mobile);
  width: 100%;
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
  font-size: calc(var(--header-height-mobile) / 1.25);
  line-height: 0.6;
}
@media (min-width: 480px) {
  .menu-button {
    font-size: calc(var(--header-height-wide) / 1.25);
  }
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
