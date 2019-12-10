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
import Menu from "./components/Menu.vue";
import Header from "./components/Header.vue";
import Random from "./components/Random.vue";
import Tunes from "./components/Tunes.vue";
import Setlist from "./components/Setlist.vue";

export default {
  name: "app",
  components: {
    Menu,
    Header,
    Random,
    Tunes,
    Setlist
  },
  created() {
    this.$store.dispatch("loadTunes");
    setTimeout(() => this.$store.dispatch("setShuffledTunes"), 1000);
  }
};
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

.menu-button {
  position: absolute;
  top: 0;
  right: 0;
  padding: calc(var(--header-height-mobile) / 5);
  height: var(--header-height-mobile);
  width: var(--header-height-mobile);
  color: var(--header-inactive-color);
  -webkit-tap-highlight-color: transparent;
}
@media (min-width: 480px) {
  .menu-button {
    padding: calc(var(--header-height-wide) / 5);
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

ol,
ul {
  margin: 0;
  border: 0;
  padding: 0;
  list-style-type: none;
}
</style>
