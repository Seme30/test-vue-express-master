<template>
  <div class="business-list">
    <div v-if="loading">Loading...</div>

    <div v-if="error">An error occurred: {{ error }}</div>

    <MapComponent :locations="locations" />

    <div v-if="businesses" class="controls">
      <input
        :value="searchTerm"
        @input="updateSearchTerm"
        type="text"
        placeholder="Search..."
        class="search-box"
      />
      <!-- <button @click="searchBusinesses" class="search-button">Search</button> -->
    </div>

    <div class="items" v-if="businesses">
      <TableItem v-if="businesses" :businesses="filteredBusinesses" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import axios from 'axios';
import Business from '../models/models';
import MapComponent from './MapComponent.vue';
import TableItem from './TableItem.vue';

export default defineComponent({
  components: {
    MapComponent,
    TableItem
  },
  setup() {
    const businesses = ref<Business[]>([]);
    const loading = ref(true);
    const error = ref(null);

    const searchTerm = ref('');

    axios
      .get('businessesCat')
      .then((response) => {
        businesses.value = response.data;
        loading.value = false;
      })
      .catch((err) => {
        error.value = err;
        loading.value = false;
      });

    const updateSearchTerm = (event:any) => {
      searchTerm.value = event.target.value;
    };

    const searchBusinesses = () => {
      searchTerm.value = searchTerm.value.toLowerCase();
    };

    const filteredBusinesses = computed(() => {
      if (searchTerm.value) {
        return businesses.value.filter((business) =>
          business.name.toLowerCase().startsWith(searchTerm.value),
        );
      } else {
        return businesses.value;
      }
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
      return businesses.value.flatMap((business: Business) =>
        business.locations
          ? business.locations.map((location: Location) => ({
             id: location.businessId,
              lat: location.latitude,
              lng: location.longitude,
            }))
          : [],
      );
    });

    return {
      businesses,
      loading,
      error,
      searchTerm,
      updateSearchTerm,
      searchBusinesses,
      locations,
      filteredBusinesses,
    };
  },
});
</script>

<style scoped>
.business-list {
  margin: auto;
  height: 100%;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 20px;
}

.controls {
  display: flex;
  justify-content: flex-end;
  align-items: end;
  margin: auto;
  width: 80%;
  margin-bottom: 20px;
}

.search-box {
  width: 40%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
}

.search-button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}
</style>
