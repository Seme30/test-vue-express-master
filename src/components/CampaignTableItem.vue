<template>
    <v-data-table
      :headers="headers"
      :items="sortedAndFilteredCampaigns"
      :items-per-page="5"
      class="elevation-1 styled-table"
    >
      <template v-slot:[`item.name`]="{ item }">
        <a :href="business.externalSystems[0].baseUrl" target="_blank" rel="noopener noreferrer">{{ item.name }}</a>
      </template>
    </v-data-table>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Business from '../models/models';

  interface Campaign {
  budget: number;
  businessId: number;
  name: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
  
  export default defineComponent({
    props: {
      sortedAndFilteredCampaigns: {
        type: Array as () => Campaign[],
        required: true,
      },
      business: {
        type: Object as () => Business,
        required: true,
      },
    },
    setup() {
      const headers = [
        { title: 'Name ', value: 'name', sortable: true, align: 'center', cellClass: 'text-center' },
        { title: 'Budget ', value: 'budget', sortable: true, align: 'center', cellClass: 'text-center' },
      ];
  
      return {
        headers,
      };
    },
  });
  </script>
  
  <style scoped>
  .styled-table {
    width: 80%;
    margin: 0 auto;
  }

  </style>
  