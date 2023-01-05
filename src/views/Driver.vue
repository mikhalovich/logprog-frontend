<template>
  <el-form label-width="160px" class="w-6/12">
    <el-form-item label="ФИО">
      <el-input v-model="driver.driverName" placeholder="Введите ФИО водителя" />
    </el-form-item>
    <el-form-item label="Контакты водителя">
      <el-input v-model="driver.driverContacts" placeholder="Введите контакты водителя" />
    </el-form-item>
    <el-form-item label="Паспортные данные">
      <el-input v-model="driver.driverPassport" placeholder="Please input" />
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

const { driver } = storeToRefs(companiesStore);

companiesStore.$subscribe((mutation, state) => {
  if (state.company.drivers && state.company.drivers.length && query.driverUid)
    companiesStore.setDriver(query.driverUid as string);
});

const save = async () => {
  if (query.driverUid) {
    await companiesStore.updateDriver(query.driverUid as string);
  } else {
    await companiesStore.createDriver();
    router.push({ query: { driverUid: driver.value.uid } });
  }
};
</script>
