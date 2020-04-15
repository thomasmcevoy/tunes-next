<template>
  <li
    class="menu-item"
    @click="action(item)"
    v-bind:class="{ active: item === activeItem }"
  >
    {{ item }}
  </li>
</template>

<script>
export default {
  name: 'MenuItemSort',
  props: {
    item: String,
    activeItem: String,
    action: Function
  }
}
</script>

<style scoped></style>
