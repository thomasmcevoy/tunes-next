<template>
  <Menu :isOpen="isOpen" v-on:closeMenu="closeMenu" />
  <header>
    <div id="router">
      <a v-bind:class="{ active: currentRoute === 'Random' }" @click="setRoute('Random')">RANDOM</a>
      <a v-bind:class="{ active: currentRoute === 'Tunes' }" @click="setRoute('Tunes')">TUNES</a>
      <a v-bind:class="{ active: currentRoute === 'Setlist' }" @click="setRoute('Setlist')">SETLIST</a>
    </div>
    <div class="menu-button" @click="openMenu">lll</div>
  </header>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import Menu from './Menu'

export default {
  components: { Menu },
  setup () {
    const store = useStore()
    const isOpen = ref(false)
    const openMenu = () => { isOpen.value = true }
    const closeMenu = () => { isOpen.value = false }
    const setRoute = route => { store.dispatch('setRoute', route) }

    return {
      isOpen,
      openMenu,
      closeMenu,
      setRoute,
      currentRoute: computed(() => store.state.currentRoute)
    }
  }
}
</script>

<style scoped>
header {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
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
  flex-grow: 1;
  height: 100%;
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
  position: relative;
  left: 1vw;
  padding-top: 1vw;
  color: var(--header-inactive-color);
  font-size: 0.8125em;
  font-weight: 400;
  letter-spacing: 0.125em;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
#router a.active {
  font-weight: 700;
  color: var(--header-active-color);
  letter-spacing: 0.075em;
}
#router a:hover {
  cursor: pointer;
}
#router a.active:hover {
  cursor: default;
}

.menu-button {
  height: var(--header-height-mobile);
  width: var(--header-height-mobile);
  font-size: 2em;
  color: var(--header-inactive-color);
  transform: rotate(270deg);
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
</style>
