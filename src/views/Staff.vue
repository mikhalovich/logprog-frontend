<template>
  <div>Транспорт</div>
  <el-table v-if="companyVehicles.length" :data="companyVehicles" style="width: 100%">
    <el-table-column label="Регистрационный номер" sortable width="160">
      <template #default="scope">
        <router-link
          class="text-blue-600 underline"
          :to="{ name: 'vehicle', query: { vehicleUid: scope.row.uid } }"
        >
          {{ scope.row.registrationNumber }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column label="Марка и модель" prop="mark" />
    <el-table-column label="Тип" prop="type" />
    <el-table-column align="right" width="150">
      <template #header>
        <el-input v-model="veiclesSearch" size="small" placeholder="Поиск" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleCopy(scope.$index, scope.row)"
          >Copy</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-button
    @click="createNew('vehicle')"
    type="success"
    :icon="Plus"
    circle
    size="large"
    class="mt-12"
  />
  <div class="mt-16">Водители</div>
  <el-table v-if="companyDrivers.length" :data="companyDrivers" style="width: 100%">
    <el-table-column label="ФИО" sortable width="160">
      <template #default="scope">
        <router-link
          class="text-blue-600 underline"
          :to="{ name: 'driver', query: { driverUid: scope.row.uid } }"
        >
          {{ scope.row.driverName }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column label="Контакты" prop="driverContacts" />
    <el-table-column label="Паспортные данные" prop="driverPassport" />
    <el-table-column align="right" width="150">
      <template #header>
        <el-input v-model="driversSearch" size="small" placeholder="Поиск" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleCopy(scope.$index, scope.row)"
          >Copy</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-button
    @click="createNew('driver')"
    type="success"
    :icon="Plus"
    circle
    size="large"
    class="mt-12"
  />
</template>
<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCompaniesStore } from "@/stores/companies.store";

const router = useRouter();

const companiesStore = useCompaniesStore();

const veiclesSearch = ref("");
const driversSearch = ref("");
const companyVehicles = computed(() => {
  return companiesStore.getCompanyVehicles || [];
});

const companyDrivers = computed(() => {
  return companiesStore.getCompanyDrivers || [];
});

const createNew = (routeName: string) => {
  router.push({ name: routeName });
};

const handleCopy = (index: number, row: {}) => {
  console.log();
};
const handleDelete = (index: number, row: {}) => {
  console.log();
};
</script>
