<template>
  <v-container>
    <v-col cols="4" v-show="true">
      <v-form ref="form">
        <v-menu
          :value="orderCreateMenuDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="orderCreateDate"
              label="Дата заявки"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker :value="orderCreateDate" @change="updateOrder($event, 'orderCreateDate')"></v-date-picker>
        </v-menu>
        <v-menu
          :value="shipmentMenuDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="shipmentDate"
              label="Дата загрузки и выгрузки"
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker :value="shipmentDate" @input="updateOrder($event, 'shipmentDate')" range></v-date-picker>
        </v-menu>
        <v-select
          :value="carrier"
          @input="fetchCarrier"
          :items="allCarriers"
          item-text="name"
          return-object
          label="Перевозчик"
          dense
        ></v-select>
        <v-select
          :value="truck"
          @input="updateOrder($event, 'truck')"
          :items="trucks"
          return-object
          label="Тягач"
          dense
        >
          <template slot="item" slot-scope="{ item }">
            {{ `${item.mark} ${item.registrationNumber}` }}
          </template>
          <template slot="selection" slot-scope="{ item }">
            {{ `${item.mark} ${item.registrationNumber}` }}
          </template>
        </v-select>
        <v-select
          :value="trailer"
          @input="updateOrder($event, 'trailer')"
          :items="trailers"
          return-object
          label="Прицеп"
          dense
        >
          <template slot="item" slot-scope="{ item }">
            {{ `${item.mark} ${item.registrationNumber}` }}
          </template>
          <template slot="selection" slot-scope="{ item }">
            {{ `${item.mark} ${item.registrationNumber}` }}
          </template>
        </v-select>
        <v-select
          :value="driver"
          @input="updateOrder($event, 'driver')"
          :items="drivers"
          item-text="driverName"
          return-object
          label="Водитель"
          dense
        >
          <template slot="item" slot-scope="{ item }">
            {{ `${item.driverName}` }}
          </template>
          <template slot="selection" slot-scope="{ item }">
            {{ `${item.driverName}` }}
          </template>
        </v-select>
        <v-select
          :value="client"
          @input="fetchClient"
          :items="allClients"
          item-text="name"
          return-object
          label="Клиент"
          dense
        ></v-select>
        <v-select
          :value="currency"
          @input="updateOrder($event, 'currency')"
          :items="currencies"
          label="Валюта"
          dense
        ></v-select>
        <v-text-field
          :value="cargo"
          @input="updateOrder($event, 'cargo')"
          label="Описание груза"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          :value="carrierPrice"
          @input="updateOrder($event, 'carrierPrice')"
          label="Стоимость для перевозчика"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          :value="clientPrice"
          @input="updateOrder($event, 'clientPrice')"
          label="Стоимость для заказчика"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          :value="fromPoint"
          @input="updateOrder($event, 'fromPoint')"
          label="Откуда"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          :value="toPoint"
          @input="updateOrder($event, 'toPoint')"
          label="Куда"
          hide-details="auto"
        ></v-text-field>
        <v-btn color="success" class="mt-4" @click="save">Сохранить</v-btn>
        <v-btn color="success" class="mt-4" @click="print(false)">Печать для перевозчика</v-btn>
        <v-btn color="success" class="mt-4" @click="print(true)">Печать для клиента</v-btn>
        <div>
        </div>
      </v-form>
    </v-col>
    <PrintPage :is-client="isClient" id="orderPrintForm" v-if="isPrint" />
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import PrintPage from '@/components/PrintPage.vue';

export default {
  components: {
    PrintPage
  },

  async created () {
    await this.fetchData({ module: 'orders', type: 'Contractors' });
    if (this.$route.query.orderUid) {
      await this.fetchData({ module: 'orders', type: 'Order', payload: this.$route.query.orderUid });
      await this.fetchData({ module: 'orders', type: 'Carrier', payload: this.$store.state.orders.order.carrier });
    };
  },

  data () {
    return {
      orderCreateMenuDate: '',
      shipmentMenuDate: '',
      isClient: false,
      isPrint: true
    };
  },

  computed: {
    allCarriers () {
      const contractorsCarriers = this.$store.state.orders.allContractors.filter(contractor => contractor.type === 'carrier');
      const company = this.$store.state.companies.company;
      return [...contractorsCarriers, company];
    },

    ...mapGetters('orders', {
      allClients: 'getClients',
      trucks: 'getCarriersTrucks',
      trailers: 'getCarriersTrailers',
      drivers: 'getCarriersDrivers'
    }),
    ...mapState({
      orderUid: state => state.orders.order.orderUid || '',
      orderCreateDate: state => state.orders.order.orderCreateDate,
      shipmentDate: state => state.orders.order.shipmentDate,
      carrier: state => state.orders.order.carrier,
      orderCarrier: state => state.orders.order.carrier,
      truck: state => state.orders.order.truck,
      trailer: state => state.orders.order.trailer,
      driver: state => state.orders.order.driver,
      client: state => state.orders.order.client,
      currency: state => state.orders.order.currency,
      cargo: state => state.orders.order.cargo,
      carrierPrice: state => state.orders.order.carrierPrice,
      clientPrice: state => state.orders.order.clientPrice,
      fromPoint: state => state.orders.order.fromPoint,
      toPoint: state => state.orders.order.toPoint,
      allContractors: state => state.orders.allContractors,
      currencies: state => state.orders.currencies
    })
  },

  methods: {
    ...mapMutations('orders', ['setOrder']),
    ...mapActions(['fetchData']),
    ...mapActions('orders', ['createOrder', 'fetchLastOrder', 'fetchCarrier', 'fetchClient', 'saveOrder']),

    updateOrder (e, fieldName) {
      this.setOrder({ [fieldName]: e });
    },

    async save () {
      await this.saveOrder(this.$route.query.orderUid);
      if (!this.$route.query.vehicleUid && this.orderUid) {
        this.$router.push({ query: { orderUid: this.orderUid } });
      }
    },

    print (param) {
      this.isClient = param;
      this.isPrint = true;
      setTimeout(() => {
        const options = {
          name: '_blank',
          specs: [
            'fullscreen=yes',
            'titlebar=yes',
            'scrollbars=yes'
          ],
          styles: [
            'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
            'https://unpkg.com/kidlat-css/css/kidlat.css',
            '/print.css'
          ],
          timeout: 1000, // default timeout before the print window appears
          autoClose: true, // if false, the window will not close after printing
          windowTitle: window.document.title // override the window title
        };
        this.$htmlToPaper('orderPrintForm', options);
        this.isPrint = false;
      }, 0);
      debugger;
    }
  }
};
</script>

<style></style>
