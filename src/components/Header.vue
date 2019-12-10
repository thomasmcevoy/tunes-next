<template>
  <header>
    <div id="router">
      <a
        v-bind:class="{ active: currentRoute === 'Random' }"
        @click="handleClick('Random')"
        >random</a
      >
      <a
        v-bind:class="{ active: currentRoute === 'Tunes' }"
        @click="handleClick('Tunes')"
        >tunes</a
      >
      <a
        v-bind:class="{ active: currentRoute === 'Setlist' }"
        @click="handleClick('Setlist')"
        >setlist</a
      >
    </div>
    <svg class="menu-button" viewBox="0 0 26 26" @click="openMenu()">
      <path
        d="M 0 4 L 0 6 L 26 6 L 26 4 Z M 0 12 L 0 14 L 26 14 L 26 12 Z M 0 20 L 0 22 L 26 22 L 26 20 Z "
      ></path>
    </svg>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Header",
  methods: {
    ...mapActions(["setRoute", "openMenu"]),
    handleClick(route) {
      this.setRoute(route);
    }
  },
  computed: {
    ...mapState({
      currentRoute: state => state.currentRoute
    })
  }
};
</script>

<style scoped>
header {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height-mobile);
  background-color: var(--inner-background-color);
}
@media (min-width: 480px) {
  header {
    height: var(--header-height-wide);
  }
}

#router {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: calc(100% - calc(var(--header-height-mobile)) * 0.8);
  max-width: 768px;
  text-align: center;
  list-style-type: none;
}
@media (min-width: 769px) {
  #router {
    margin: auto;
  }
}
@media (min-width: 1000px) {
  #router {
    justify-content: space-around;
  }
}

#router a {
  padding-top: 0.5vw;
  color: var(--header-inactive-color);
  font-size: 1em;
  font-weight: 100;
  letter-spacing: 0.075em;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
#router a.active {
  font-weight: 500;
  color: var(--header-active-color);
  letter-spacing: 0.05em;
}
#router a:hover {
  cursor: pointer;
}
#router a.active:hover {
  cursor: default;
}
</style>
