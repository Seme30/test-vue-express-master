<template>
  <div class="business-list">
    <div v-if="businesses" class="controls">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search..."
        class="search-box"
      />
      <button @click="sortBusinesses" class="sort-button">Sort</button>
    </div>

    <div v-if="loading">Loading...</div>

    <div v-if="error">An error occurred: {{ error }}</div>

    <MapComponent :locations="locations" />

    <div class="items" v-if="businesses">
      <CardItem
        v-for="business in businesses"
        :key="business.id"
        :business="business"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import axios from 'axios';
import Business from '../models/models';
import CardItem from './CardItem.vue';
import MapComponent from './MapComponent.vue';

export default defineComponent({
  components: {
    CardItem,
    MapComponent,
  },
  setup() {
    const businesses = ref<Business[]>([]);
    const loading = ref(true);
    const error = ref(null);

    const searchTerm = ref('');
    const sortColumn = ref('');

    axios
      .get('businessesCat')
      .then((response) => {
        businesses.value = response.data;
        console.log(businesses.value);
        loading.value = false;
      })
      .catch((err) => {
        error.value = err;
        loading.value = false;
      });

    const sortBusinesses = () => {
      if (sortColumn.value) {
        sortColumn.value = '';
      } else {
        sortColumn.value = 'name';
      }
    };

    const sortedAndFilteredBusinesses = computed(() => {
      let result = businesses.value;
      if (searchTerm.value) {
        const lowerCaseSearchTerm = searchTerm.value.toLowerCase();
        result = result.filter((business) =>
          business.name.toLowerCase().startsWith(lowerCaseSearchTerm),
        );
      }
      if (sortColumn.value) {
        result.sort((a, b) => a.name.localeCompare(b.name));
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
      return businesses.value.flatMap((business: Business) =>
        business.locations
          ? business.locations.map((location: Location) => ({
              lat: location.latitude,
              lng: location.longitude,
            }))
          : [],
      );
    });

    return {
      businesses: sortedAndFilteredBusinesses,
      loading,
      error,
      searchTerm,
      sortBusinesses,
      locations,
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
}

.controls {
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 60%;
  margin-bottom: 20px;
}

.search-box {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
