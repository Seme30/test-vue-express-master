<template>
  <v-data-table
    :headers="headers"
    :items="businesses"
    :items-per-page="10"
    class="elevation-1 styled-table"
  >
  <template v-slot:[`item.name`]="{ item }">
  <a @click="goToDetailPage(item.id)">{{ item.name }}</a>
</template>


  </v-data-table>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import Business from '../models/models';

export default defineComponent({
  props: {
    businesses: {
      type: Array as () => Business[],
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const headers = [
  { text: 'Name', value: 'name', sortable: true },
  { text: 'Category', value: 'category.name', sortable: true },
  { text: 'Number of Campaigns', value: 'campaigns.length', sortable: true },
  { text: 'Average Campaign Budget', value: 'averageCampaignBudget', sortable: true },
];


  
      const goToDetailPage = (id: number) => {
        console.log(id);
        router.push(`/business/${id}`);
      };



  
const calculateAverageCampaignBudget = (
  campaigns: {
    budget: number;
    businessId: number;
    name: string;
    id: number;
    createdAt: string;
    updatedAt: string;
  }[],
) => {
  if (!campaigns || campaigns.length === 0) {
    return 0; 
  }
  const totalBudget = campaigns.reduce(
    (acc, campaign) => acc + campaign.budget,
    0,
  );
  return totalBudget / campaigns.length; 
};

      return {
        headers,
        calculateAverageCampaignBudget,
        goToDetailPage,
      };
    },
  });
  </script>
  
  <style scoped>

  .styled-table {
    width: 800px;
    margin: auto;
  }
.styled-table >>> .v-data-table-header {
  background-color: #4caf50;
  color: white;
}
   
  </style>
  