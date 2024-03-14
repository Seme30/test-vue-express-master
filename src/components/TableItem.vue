<template>
    <table class="business-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Number of Campaigns</th>
          <th>Average Campaign Budget</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="business in businesses" :key="business.id">
          <td @click="goToDetailPage(business.id)">{{ business.name }}</td>
          <td>{{ business.category.name }}</td>
          <td>{{ business.campaigns.length }}</td>
          <td>{{ calculateAverageCampaignBudget(business.campaigns) }}</td>
        </tr>
      </tbody>
    </table>
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
    setup() {
      const router = useRouter();
  
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
  
      const goToDetailPage = (id: number) => {
        console.log(id);
        router.push(`/business/${id}`);
      };
  
      return {
        calculateAverageCampaignBudget,
        goToDetailPage,
      };
    },
  });
  </script>
  
  <style scoped>
  .business-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .business-table th,
  .business-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .business-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  .business-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4caf50;
    color: white;
  }
  
  .business-table td {
    cursor: pointer;
  }
  
  .business-table td:hover {
    background-color: #ddd;
  }
  </style>
  