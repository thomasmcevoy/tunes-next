import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { VueHammer } from "vue2-hammer";
import backupTunes from "./assets/backupTunes.js";
import jazzComposers from "./assets/jazzComposers.js";
import standardsComposers from "./assets/standardsComposers.js";

Vue.config.devtools = true;
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(VueHammer);
console.log(VueHammer.config);
VueHammer.config.pan = {
  direction: 6
};

const URL = "https://thomasmcevoy.github.io/tunes-api";

export default new Vuex.Store({
  state: {
    tunes: [],
    setlist: [],
    shuffledTunes: [0, 1],
    filter: "All",
    sortBy: "Title",
    menuIsOpen: false,
    isScrolling: false,
    currentRoute: "Tunes"
  },
  getters: {
    sortedFilteredTunes: state => {
      return state.tunes
        .filter(tune => {
          switch (state.filter) {
            case "All":
              return true;
            case "Latin":
              return tune.latin;
            case "Blues":
              return tune.blues;
            case "Minor":
              return tune.minor;
            case "Waltzes":
              return tune.waltz;
            case "Ballads":
              return tune.ballad;
            case "Holiday":
              return tune.holiday;
            case "Contrafacts":
              return tune.contrafact;
            case "Rhythm":
              return tune.rhythm;
            case "Miles":
              return tune.miles || tune.composer.includes("Miles Davis");
            case "Sinatra":
              return tune.sinatra || tune.composer.includes("Sinatra");
            case "Standards":
              return tune.composer
                .split(/[,&/]/)
                .some(composer => standardsComposers.includes(composer.trim()));
            case "Jazz tunes":
              return tune.composer
                .split(/[,&/]/)
                .some(composer => jazzComposers.includes(composer.trim()));
            default:
              return false;
          }
        })
        .sort((a, b) => {
          if (state.sortBy === "Year") return a.year - b.year;
          else {
            if (a[state.sortBy.toLowerCase()] < b[state.sortBy.toLowerCase()])
              return -1;
            if (a[state.sortBy.toLowerCase()] > b[state.sortBy.toLowerCase()])
              return 1;
            return 0;
          }
        });
    }
  },
  mutations: {
    setTunes(state, tunes) {
      state.tunes = tunes;
    },
    setShuffledTunes(state, shuffledTunes) {
      state.shuffledTunes = shuffledTunes;
    },
    setRoute(state, route) {
      state.currentRoute = route;
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    setSortBy(state, sortBy) {
      state.sortBy = sortBy;
    },
    setIsScrolling(state, isScrolling) {
      state.isScrolling = isScrolling;
    },
    openMenu(state) {
      state.menuIsOpen = true;
    },
    closeMenu(state) {
      state.menuIsOpen = false;
    },
    addToSetlist(state, tune) {
      state.setlist.push(tune);
    },
    removeFromSetlist(state, tune, index) {
      if (index === undefined) {
        index = state.setlist.indexOf(tune);
      }
      state.setlist.splice(index, 1);
    },
    addToShuffledTunes(state, tune) {
      state.shuffledTunes.unshift(tune);
    },
    deleteFirstShuffledTune(state) {
      state.shuffledTunes.shift();
    }
  },
  actions: {
    loadTunes({ commit }) {
      if (process.env.NODE_ENV === "development") {
        commit("setTunes", backupTunes);
      } else {
        axios
          .get(URL)
          .then(response => commit("setTunes", response.data))
          .catch(error => {
            commit("setTunes", backupTunes);
            console.log("Error connecting to Tunes API, loading backup tunes.");
            console.log(error);
          });
      }
    },
    setShuffledTunes({ commit }) {
      const tunes = this.state.tunes.slice(0);
      for (let i = tunes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tunes[i], tunes[j]] = [tunes[j], tunes[i]];
      }
      commit("setShuffledTunes", tunes);
    },
    setRoute({ commit }, route) {
      commit("setRoute", route);
    },
    setFilter({ commit }, filter) {
      commit("setFilter", filter);
    },
    setSortBy({ commit }, sortBy) {
      commit("setSortBy", sortBy);
    },
    setIsScrolling({ commit }, isScrolling) {
      commit("isScrolling", isScrolling);
    },
    addToSetlist({ commit }, tune, index) {
      commit("addToSetlist", tune, index);
    },
    removeFromSetlist({ commit }, tune) {
      commit("removeFromSetlist", tune);
    },
    openMenu({ commit }) {
      commit("openMenu");
    },
    closeMenu({ commit }) {
      commit("closeMenu");
    },
    addToShuffledTunes({ commit }, tune) {
      commit("addToShuffledTunes", tune);
    },
    deleteFirstShuffledTune({ commit }) {
      commit("deleteFirstShuffledTune");
    }
  }
});
