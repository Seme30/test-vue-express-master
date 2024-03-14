
<template>
    <div class="map">
      <l-map :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker
        v-for="(location, index) in locations"
        :key="index"
        :lat-lng="location"
      ></l-marker>
        
      </l-map>
    </div>
  </template>
  
  <script lang="ts">
  /* eslint-disable */
  import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
  import 'leaflet/dist/leaflet.css';
  import { PropType, ref, SetupContext } from 'vue';
  
  interface Location {
    lat: number;
    lng: number;
    id: string;
  }

  type Props = {
  locations: Location[];
};
  
  export default {
    name: 'MapComponent',
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    props: {
      locations: {
      type: Array as PropType<Location[]>,
      default: () => [],
    },
    },
    setup(props: any) {
      const zoom = ref(17);
      const center = ref([props.locations[0]?.lat, props.locations[0]?.lng]);
      const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      const attribution = ref(
        'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      );

      return {
        zoom,
        center,
        url,
        attribution
      };
    },
  };
  </script>
  
  
  <style scoped>
  .map {
    width: 80%;
    height: 750px;
    height: 500px;
    margin: 0 auto;
  }
  </style>
  