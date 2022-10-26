<template>
  <v-container>
    <v-form ref="form">
      <v-text-field
        :value="registrationNumber"
        @input="updateOrder($event, 'registrationNumber')"
        name="registrationNumber"
        label="Регистрационный номер"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        :value="mark"
        @input="updateOrder($event, 'mark')"
        name="mark"
        label="Марка и модель"
        hide-details="auto"
      ></v-text-field>
      <v-select
        :value="type"
        :items="allTypes"
        @input="updateOrder($event, 'type')"
        item-text="title"
        item-value="type"
        return-object
        label="Тип"
      ></v-select>
      <v-btn color="success" class="mt-4" @click="save">Сохранить</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  async created () {
    if (this.$route.query.vehicleUid) await this.fetchData({ module: 'vehicles', type: 'Vehicle', payload: this.$route.query.vehicleUid });
  },

  beforeDestroy () {
    this.removeVehicle();
  },

  methods: {
    ...mapActions(['fetchData']),
    ...mapActions('vehicles', ['saveVehicle']),
    ...mapMutations('vehicles', ['setVehicle', 'removeVehicle']),

    updateOrder (e, fieldName) {
      this.setVehicle({ [fieldName]: e });
    },

    async save () {
      await this.saveVehicle(this.$route.query.vehicleUid);
      if (!this.$route.query.vehicleUid && this.vehicleUid) {
        this.$router.push({ query: { vehicleUid: this.vehicleUid } });
      }
    }
  },

  computed: {
    ...mapState({
      registrationNumber: state => state.vehicles.vehicle.registrationNumber,
      mark: state => state.vehicles.vehicle.mark,
      type: state => state.vehicles.vehicle.type,
      vehicleUid: state => state.vehicles.vehicle.vehicleUid || '',
      allTypes: state => state.vehicles.allTypes
    })
  }
};
</script>

<style></style>
