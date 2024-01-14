<template>
  <router-link v-if="icon" :class="mobile ? 'router-link router-link-mobile mx-4' : 'router-link router-link-desktop px-4'" :to="to">
    <svg-vue :icon="icon" class="mx-3 w-5 h-5 transition ease-in-out duration-150"></svg-vue>
    {{ label }}
  </router-link>
</template>

<script>
export default {
  name: 'menu-item',
  props: {
    mobile: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      required: true,
    },
    icon: {
      type: [Array, String, Object],
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

