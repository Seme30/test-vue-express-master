<template>
    <div class="business-list">
    
      <div v-if="loading">Loading...</div>

      <div v-if="error">An error occurred: {{ error }}</div>
  
      <CardItem v-for="business in businesses" :key="business.id" :business="business" v-else />

    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import Business from '../models/models';
  import CardItem from './CardItem.vue';

  export default defineComponent({
    components: {
        CardItem
    },
    setup() {
      const businesses = ref<Business[]>([]);
      const loading = ref(true);
      const error = ref(null);
  
      axios.get('businessesCat')
        .then(response => {
          businesses.value = response.data;
          loading.value = false;
        })
        .catch(err => {
          error.value = err;
          loading.value = false;
        });
  
      return {
        businesses,
        loading,
        error
      };
    }
  });
  </script>
  

  <style scoped>
  .business-list {
    display: flex;
    flex-wrap: wrap;
  }
  </style>
  
  