<template>
  <div class="map">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="(location, index) in locations"
        :key="index"
        :lat-lng="location"
      ></l-marker>
      <p>{{ locations }}</p>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';
import { ref } from 'vue';

export default {
  name: 'MapComponent',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    locations: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const zoom = ref(17);
    const center = ref([40.7112591840988, -74.0063372315252]);
    const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    const attribution = ref(
      'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    );

    return {
      zoom,
      center,
      url,
      attribution,
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
