<template>
  <v-card flat>
    <v-data-table
    :headers="headers"
    :items="computedBusinesses"
    :items-per-page="10"
    class="elevation-1 styled-table"
  >
  <template v-slot:[`item.name`]="{ item }">
  <a @click="goToDetailPage(item.id)">{{ item.name }}</a>
</template>


  </v-data-table>
  </v-card>

</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
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
      { title: 'Name', value: 'name', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
      { title: 'Category', value: 'category.name', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
      { title: 'Number of Campaigns', value: 'campaigns.length', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
      { title: 'Average Campaign Budget', value: 'averageCampaignBudget', sortable: true, align: 'center', cellClass: 'text-center', headerClass: 'text-center' },
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

    const computedBusinesses = computed(() => {
      return props.businesses.map(business => ({
        ...business,
        averageCampaignBudget: calculateAverageCampaignBudget(business.campaigns),
      }));
    });

    return {
      headers,
      computedBusinesses,
      goToDetailPage,
    };
  },
});
</script>
  
  <style scoped>

  .styled-table {
  width: 80%;
  margin: 0 auto;
  }
.styled-table >>> .v-data-table-header {
  background-color: #4caf50;
  color: white;
}
   
  </style>
