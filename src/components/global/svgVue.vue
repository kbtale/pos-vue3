<template>
    <font-awesome-icon :icon="icon" class="fa-icon" />
  </template>
  
<script>
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { fas } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
    library.add(fas);
  
export default {
    components: {
      FontAwesomeIcon
    },
    props: ['icon'],
};
</script>
  