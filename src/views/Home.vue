<template>
  <el-table
    v-if="filteredOrders.length"
    :data="filteredOrders"
    :default-sort="{ prop: 'orderNumber', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column label="Номер" prop="orderNumber" sortable width="80">
      <template #default="scope">
        <router-link
          class="text-blue-600 underline"
          :to="{ name: 'order', query: { orderUid: scope.row.orderUid } }"
        >
          {{ scope.row.orderNumber }}
        </router-link>
      </template>
    </el-table-column>
    <el-table-column label="Даты перевозки" prop="shipmentDate" width="150" />
    <el-table-column label="Заказчик" prop="client.name" />
    <el-table-column label="Перевозчик" prop="carrier.name" />
    <el-table-column label="Маршрут" prop="route" />
    <el-table-column align="right" width="150">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Поиск" />
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
    @click="createNewOrder()"
    type="success"
    :icon="Plus"
    circle
    size="large"
    class="mt-12"
  />
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import { useOrdersStore } from "@/stores/orders.store";
import { IFilteredOrder } from "@/types";

const search = ref("");
const router = useRouter();
const ordersStore = useOrdersStore();

ordersStore.fetchOrders();
const filteredOrders = computed(() => {
  return ordersStore.filteredOrders;
});

const createNewOrder = () => {
  router.push({ name: "order" });
};

const handleCopy = (index: number, row: IFilteredOrder) => {
  console.log();
};
const handleDelete = (index: number, row: IFilteredOrder) => {
  console.log();
};
</script>
