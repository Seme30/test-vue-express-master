<template>
  <div
    class="card"
    @click="goToDetailPage"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div v-if="business" class="card-content">
      <h2>{{ business.name }}</h2>
      <p>Category: {{ business.category.name }}</p>
      <p>Number of Campaigns: {{ business.campaigns.length }}</p>
      <p>Average Campaign Budget: {{ averageCampaignBudget }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Business from '../models/models';

export default defineComponent({
  props: {
    business: {
      type: Object as () => Business,
      required: true,
    },
  },
  setup(props) {
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
        return 'N/A';
      }
      const totalBudget = campaigns.reduce(
        (acc, campaign) => acc + campaign.budget,
        0,
      );
      return (totalBudget / campaigns.length).toFixed(2);
    };

    const averageCampaignBudget = ref(
      calculateAverageCampaignBudget(props.business.campaigns),
    );
    const isHover = ref(false);
    const router = useRouter();

    const goToDetailPage = () => {
      console.log(props.business.id);
      router.push(`/business/${props.business.id}`);
    };

    return {
      isHover,
      averageCampaignBudget,
      goToDetailPage,
    };
  },
});
</script>

<style scoped>
.card {
  width: 100%;
  max-width: 600px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  transition: box-shadow 0.1s ease;
}

.card:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* Reduce the size of the hover effect */
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

h2 {
  color: green;
}
</style>
