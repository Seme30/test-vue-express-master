<template>
  <div class="container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">An error occurred: {{ error }}</div>
    
    <div v-if="business" class="business">
      <h1 class="business-name">{{ business.name }}</h1>
      <h2 class="campaign-title">Campaigns</h2>

      <div v-if="locations">
        <SingleMapComp :locations="locations"/>
      </div>

      <div class="controls">
        <v-spacer></v-spacer>
        <v-text-field class="search-box"
        v-model="searchTerm"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="filled"
        flat
        hide-details
        single-line
      ></v-text-field>
      </div>
      
      <div v-if="sortedAndFilteredCampaigns">
        <CampaignTableItem :sortedAndFilteredCampaigns="sortedAndFilteredCampaigns" :business="business" />
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import Business from '../models/models';
import { useRoute } from 'vue-router';
import SingleMapComp from './SingleMapComp.vue'
import CampaignTableItem from './CampaignTableItem.vue';

export default defineComponent({

  components: {
    SingleMapComp,
    CampaignTableItem
  },
  setup() {
    const route = useRoute();
    const business = ref<Business | null>(null);
    const loading = ref(true);
    const error = ref(null);

    const searchTerm = ref('');
    const sortColumn = ref('');
    

    onMounted(async () => {
      const id = route.params.id;
      axios
        .get(`/businesses/${id}`)
        .then((response) => {
          business.value = response.data;
          loading.value = false;
        })
        .catch((err) => {
          error.value = err;
          loading.value = false;
        });
    });

    interface Campaign {
  budget: number;
  businessId: number;
  name: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

    const sortCampaigns = () => {
      if (sortColumn.value) {
        sortColumn.value = '';
      } else {
        sortColumn.value = 'name';
      }
    };


    const sortedAndFilteredCampaigns = computed(() => {
      let result = business.value?.campaigns;
      if (searchTerm.value) {
        const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
        result = result?.filter((campaign: Campaign) =>
        campaign.name.toLowerCase().startsWith(lowerCaseSearchTerm),
        );
      }
      if (sortColumn.value) {
        result?.sort((a, b) => a.name.localeCompare(b.name));
      }
      return result;
    });


    type Location = {
      businessId: number;
      id: number;
      createdAt: string;
      updatedAt: string;
      latitude: number;
      longitude: number;
    };

    const locations = computed(() => {
      return business.value?.locations.map((location: Location) => ({
              lat: location.latitude,
              lng: location.longitude,
            }))
    });

    return {
      business,
      loading,
      error,
      locations,
      sortCampaigns,
      sortColumn,
      searchTerm,
      sortedAndFilteredCampaigns
    };
  },
});
</script>

<style scoped>
.container {
  margin: auto;
  height: 100%;
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
  text-align: center;
}

.campaign-title {
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
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

.controls {
  display: flex;
  justify-content: flex-end; 
  align-items: center; 
  margin: auto;
  width: 80%;
  margin-bottom: 20px;
}

.search-box {
  width: 100px;
  margin-top: 20px;
}


.sort-button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.sort-button:hover {
  background-color: #0056b3;
}
</style>
