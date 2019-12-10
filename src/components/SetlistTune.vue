<template>
  <li class="setlist-tune-container">
    <div
      class="setlist-tune"
      v-bind:style="style"
      v-hammer:pan="onPanHorizontal"
      v-hammer:panend="onPanEnd"
    >
      <div class="title">{{ tune.title }}</div>
      <div class="detail">{{ tune.composer }} ({{ tune.year }})</div>
    </div>
    <div class="x-container">
      <div class="x">×</div>
    </div>
  </li>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SetlistTune",
  props: {
    tune: Object,
    scrollLock: Function,
    scrollUnlock: Function
  },
  computed: {
    ...mapState({
      isScrolling: state => state.isScrolling
    })
  },
  data() {
    return {
      style: {
        left: "0"
      }
    };
  },
  methods: {
    ...mapActions(["removeFromSetlist"]),
    onPanHorizontal(e) {
      if (this.isScrolling) return;
      this.scrollLock();
      if (e.deltaX <= 0 && Math.abs(e.angle) > 150) {
        this.style = {
          left: e.deltaX + "px"
        };
      }
    },
    onPanEnd(e) {
      if (this.isScrolling) return;
      this.scrollUnlock();
      if (e.deltaX < -75 && Math.abs(e.angle) > 150) {
        this.removeFromSetlist(this.tune);
      } else {
        this.resetOffset();
      }
    },
    resetOffset() {
      this.style.left = "0";
    }
  }
};
</script>

<style scoped>
.setlist-tune-container {
  position: relative;
  margin-bottom: 1px;
  max-height: 100px;
  background-color: red;
  transition: max-height 150ms 150ms;
  touch-action: pan-y !important;
}
.setlist-tune-container:hover {
  cursor: pointer;
}
.setlist-tune-container.zero-height {
  max-height: 0 !important;
}

.setlist-tune {
  position: relative;
  padding: 3.5vw 2.75vw;
  page-break-inside: avoid;
  user-select: none;
  background-color: white;
  transition: transform 150ms;
  -webkit-tap-highlight-color: transparent;
}
@media (min-width: 500px) {
  .setlist-tune {
    padding: 1.125em 2.75vw;
    touch-action: pan-y !important;
  }
}
.setlist-tune.is-panning {
  transition: none !important;
}
.setlist-tune.far-left {
  transform: translateX(-100vw) !important;
}
.setlist-tune .title {
  font-size: 1.25em;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.05em;
  touch-action: pan-y !important;
}

.setlist-tune .detail {
  font-size: 0.75em;
  touch-action: pan-y !important;
}

.x-container {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  color: white;
}
.x {
  position: absolute;
  right: calc(8.42vw - 0.25em);
  top: 50%;
  transform: translateY(-50%);
}
</style>
