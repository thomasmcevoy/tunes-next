<template>
  <div id="app">
    <Menu />
    <Header />
    <main>
      <Random />
      <Tunes />
      <Setlist />
    </main>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Header from './components/Header.vue'
import Random from './components/Random.vue'
import Tunes from './components/Tunes.vue'
import Setlist from './components/Setlist.vue'

export default {
  name: 'app',
  components: {
    Menu,
    Header,
    Random,
    Tunes,
    Setlist
  },
  created () {
    this.$store.dispatch('loadTunes')
  }
}
</script>

<style>
:root {
  --header-height-wide: 66px;
  --header-height-mobile: 13vw;
  --header-active-color: #696969;
  --header-inactive-color: #b5b5b5;
  --outer-background-color: rgb(25, 46, 90);
  --inner-background-color: #eee;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  border: 0;
  padding: 0;
  background-color: var(--inner-background-color);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  margin: var(--header-height-mobile) 0.25em 0;
}
@media (min-width: 475px) {
  main {
    margin-top: var(--header-height-wide);
  }
}

ol,
ul {
  margin: 0;
  border: 0;
  padding: 0;
  list-style-type: none;
}

.menu-button {
  z-index: 10;
  font-weight: 100;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
