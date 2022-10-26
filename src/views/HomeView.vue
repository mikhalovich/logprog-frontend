<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Поиск"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table :headers="headers" :items="orders" :search="search" dense>
      <template v-slot:item.orderNumber="{ item }">
        <router-link :to="{ name: 'order', query: { orderUid: item.orderUid } }">
          {{ item.orderNumber }}
        </router-link>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="copyItem(item)"
        >
          mdi-text-box-multiple-outline
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-btn to="/orders/order" class="mx-2" fab dark color="green">
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Номер',
          align: 'start',
          value: 'orderNumber'
        },
        { text: 'Даты перевозки', value: 'shipmentDate' },
        { text: 'Заказчик', value: 'customer.name' },
        { text: 'Перевозчик', value: 'carrier.name' },
        { text: 'Маршрут', value: 'route' },
        { text: 'Действия', value: 'actions', sortable: false }
      ]
    };
  },

  created () {
    this.fetchOrders();
  },

  methods: {
    ...mapActions('orders', ['fetchOrders']),

    copyItem (item) {
      console.log(item);
      debugger;
    }
  },
  computed: {
    ...mapGetters('orders', { orders: 'getAllOrders' })
  }
};
</script>

<style>
</style>
