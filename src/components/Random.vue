<template>
  <div id="random" v-if="currentRoute === 'Random'">
    <div id="stack">
      <div
        class="current tune"
        v-bind:style="style"
        v-hammer:pan="onPan"
        v-hammer:panend="onPanEnd"
      >
        <div class="title">{{ currentTune.title }}</div>
        <div class="detail">{{ currentTune.composer }} ({{ currentTune.year }})</div>
      </div>
      <!-- <div class="next tune">
        <div class="title">{{ tunes[1].title }}</div>
        <div class="detail">{{ tunes[1].composer }} ({{ tunes[1].year }})</div>
      </div>-->
    </div>
    <div id="back" v-if="discarded.length > 0" @click="goBack">&lt; BACK</div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive, ref, onMounted, watch, watchEffect } from 'vue'
// import { TweenLite } from "gsap";

const shuffle = tunes => {
  const shuffledTunes = tunes.slice(0)
  for (let i = shuffledTunes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledTunes[i], shuffledTunes[j]] = [shuffledTunes[j], shuffledTunes[i]]
  }
  return shuffledTunes
}

export default {
  setup () {
    const store = useStore()
    const state = reactive({
      currentRoute: computed(() => store.state.currentRoute),
      filteredTunes: computed(() => store.getters.filteredTunes),
      shuffledtunes: [],
      discarded: [],
      style: {
        top: '0',
        left: '0'
      }
    })
    const currentTune = ref(null)

    watchEffect(() => {
      state.tunes = shuffle(state.filteredTunes)
      currentTune.value = state.tunes[0]
      // state.currentTune = state.tunes[0]
    })

    onMounted(() => {
      console.log('currentTune: ', currentTune.value)
      console.log('state.tunes[0]: ', state.tunes[0])
    })

    const onPan = e => {
      state.style = {
        top: String(e.deltaY) + 'px',
        left: String(e.deltaX) + 'px'
      }
    }

    const onPanEnd = e => {
      const tune = state.tunes[0]
      if (Math.abs(e.deltaX) < 85) {
        // TweenLite.to(this.style, { top: "0px", left: "0px" }, 100);
        this.resetOffsets()
      } else {
        if (e.deltaX > 0) {
          store.addToSetlist(tune)
        } else {
          state.discarded.push(tune)
        }
        state.tunes.shift()
        resetOffsets()
      }
    }

    const resetOffsets = () => {
      this.style = {
        top: '0',
        left: '0'
      }
    }

    // watch (() => {
    // filteredTunes: function (newTunes, oldTunes) {
    //   this.tunes = this.shuffle(newTunes)
    //   this.discarded = []
    // })

    const goBack = () => {
      const tune = state.discarded.pop()
      state.tunes.unshift(tune)
    }

    return {
      currentRoute: computed(() => state.currentRoute),
      discarded: computed(() => state.discarded),
      tunes: computed(() => state.tunes),
      style: computed(() => state.style),
      currentTune,
      onPan,
      onPanEnd,
      goBack,
      watch,
      ref
    }
  }

  // watch: {
  //   filteredTunes: function (newTunes, oldTunes) {
  //     this.tunes = this.shuffle(newTunes)
  //     this.discarded = []
  //   }
  // },
  // methods: {
  //
  //   onPan (e) {
  //     this.style = {
  //       top: String(e.deltaY) + 'px',
  //       left: String(e.deltaX) + 'px'
  //     }
  //   },
  //   onPanEnd (e) {
  //     const tune = this.tunes[0]
  //     if (Math.abs(e.deltaX) < 85) {
  //       // TweenLite.to(this.style, { top: "0px", left: "0px" }, 100);
  //       this.resetOffsets()
  //     } else {
  //       if (e.deltaX > 0) {
  //         this.addToSetlist(tune)
  //       } else {
  //         this.discarded.push(tune)
  //       }
  //       this.tunes.shift()
  //       this.resetOffsets()
  //     }
  //   },
  //   resetOffsets () {
  //     this.style = {
  //       top: '0',
  //       left: '0'
  //     }
  //   }
  // }
}
</script>

<style scoped>
#random {
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: calc(100% - var(--header-height-mobile));
}
@media (min-width: 480px) {
  #random {
    height: calc(100% - var(--header-height-wide));
  }
}

#stack {
  position: absolute;
  top: calc(60vh - var(--header-height-mobile) - 12em);
  left: 6.25%;
}

.tune {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  min-height: 12em;
  min-width: 17em;
  max-width: 75%;
  text-align: center;
  user-select: none;
  padding: 6vh 8.5vw;
}
@media (min-width: 415px) {
  .tune {
    padding: 8vh 8vw;
    max-width: 400px;
  }
}

.tune .title {
  padding-bottom: 0.2em;
  font-size: 1.825em;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.0175em;
}

.tune .detail {
  font-size: 1.0625em;
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.tune.current {
  z-index: 2;
}
.tune.next {
  z-index: 1;
}

#back {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0.67em;
  padding: 0.67em;
  color: var(--header-inactive-color);
  font-weight: 400;
  font-size: 0.75em;
  letter-spacing: 0.075em;
  user-select: none;
}
#back:hover,
#back:active {
  cursor: pointer;
}
#back:active {
  font-weight: 700;
  color: var(--header-active-color);
}
</style>
