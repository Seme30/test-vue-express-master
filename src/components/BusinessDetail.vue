<template>
  <div class="container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">An error occurred: {{ error }}</div>
    <div v-if="business" class="business">
      <h1 class="business-name">{{ business.name }}</h1>
      <h2 class="campaign-title">Campaigns</h2>
      <ul class="campaign-list">
        <li v-for="campaign in business.campaigns" :key="campaign.id" class="campaign-item">
          {{ campaign.name }} - Budget: {{ campaign.budget }}
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import Business from '../models/models';
  import { useRoute } from 'vue-router';
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const business = ref<Business | null>(null);
      const loading = ref(true);
      const error = ref(null);
  
      // axios.get('businessesCat')


      onMounted(async () => {
      const id = route.params.id;
      axios.get(`/businesses/${id}`)
              .then(response => {
                business.value = response.data;
          loading.value = false;
        })
        .catch(err => {
          error.value = err;
          loading.value = false;
        });
     
    });
  
      return {
        business,
        loading,
        error
      };
    }
  });
  </script>


<style scoped>
.container {
  width: 80%;
  margin: auto;
}

.loading {
  color: blue;
}

.error {
  color: red;
}

.business {
  margin-top: 20px;
}

.business-name {
  color: green;
}

.campaign-title {
  margin-top: 10px;
}

.campaign-list {
  list-style-type: none;
  padding: 0;
}

.campaign-item {
  margin-bottom: 10px;
}
</style>
  