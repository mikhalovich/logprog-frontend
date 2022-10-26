<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Поиск"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="vehiclesHeaders"
      :items="vehicles"
      :search="search"
      dense
    >
      <template v-slot:item.registrationNumber="{ item }">
        <router-link :to="{ name: 'vehicle', query: { vehicleUid: item.vehicleUid } }">
          {{ item.registrationNumber }}
        </router-link>
      </template>
      <template v-slot:item.type="{ value }">
        {{ value && value.title }}
      </template>
      <!-- <template v-slot:item.driver="{ value }">
        {{ value && value.driverName }}
      </template> -->
    </v-data-table>
    <v-btn :to="{ name: 'vehicle' }" class="mx-2" fab dark color="green">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
</v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data () {
    return {
      search: ''
    };
  },

  async created () {
    await this.fetchData({ module: 'vehicles', type: 'Vehicles' });
  },

  methods: {
    ...mapActions(['fetchData'])
  },

  computed: {
    ...mapState('vehicles', ['vehiclesHeaders', 'vehicles'])
  }
};
</script>

<style></style>
