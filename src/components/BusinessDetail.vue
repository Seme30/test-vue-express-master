<template>
  <div class="container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">An error occurred: {{ error }}</div>
    <div v-if="business" class="business">
      <h1 class="business-name">{{ business.name }}</h1>
      <h2 class="campaign-title">Campaigns</h2>
      <ul class="campaign-list">
         <li v-for="campaign in business.campaigns" :key="campaign.id" class="campaign-item">
            <span class="campaign-name">{{ campaign.name }}</span>
            <span class="campaign-budget">Budget: {{ campaign.budget }}</span>
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
    margin-bottom: 40px;
    background: white;
    text-align: left;
    border-radius: 10px;
}

.loading {
  color: blue;
}

.error {
  color: red;
}

.business {
    width: 100%;
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    border-radius: 20px;
    letter-spacing: 1px;
    font-weight: bold;
}

.business-name {
  color: green;
  padding-top: 30px;
}

.campaign-title {
  margin-top: 10px;
  font-weight: bold;
}

.campaign-list {
  list-style-type: none;
  padding: 0;
}

.campaign-item {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.campaign-item:hover {
  background-color: #e9ecef;
}

.campaign-name {
    font-weight: bold;
    color: #333;
    display: inline-block;
    margin: 25px 0 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

.campaign-budget {
    display: block;
    font-size: 0.7rem;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    color: #555;
}
</style>
  