<template>
  <div class="home">
    <BusinessList />
  </div>
</template>

<script lang="ts">
import BusinessList from '@/components/BusinessList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    BusinessList,
  },
});
</script>
