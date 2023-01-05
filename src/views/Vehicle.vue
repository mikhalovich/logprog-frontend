<template>
  <el-form label-width="160px" class="w-6/12">
    <el-form-item label="Регистрационный номер">
      <el-input v-model="vehicle.registrationNumber" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="Марка и модель">
      <el-input v-model="vehicle.mark" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="Тип">
      <el-select
        v-model="vehicle.type"
        value-key="uid"
        class="m-2"
        placeholder="Выбрать"
        size="large"
      >
        <el-option
          v-for="(item, index) in vehicleTypes"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <el-button class="mt-12" @click="save()" type="success">Сохранить</el-button>
</template>

<script setup lang="ts">
import { useCompaniesStore } from "@/stores/companies.store";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const { query } = useRoute();

const companiesStore = useCompaniesStore();

const { vehicleTypes, vehicle } = storeToRefs(companiesStore);

companiesStore.$subscribe((mutation, state) => {
  if (state.company.vehicles && state.company.vehicles.length && query.vehicleUid)
    companiesStore.setVehicle(query.vehicleUid as string);
});

const save = async () => {
  if (query.vehicleUid) {
    await companiesStore.updateVehicle(query.vehicleUid as string);
  } else {
    await companiesStore.createVehicle();
    router.push({ query: { vehicleUid: vehicle.value.uid } });
  }
};
</script>
