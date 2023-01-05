<template>
  <el-form label-width="160px" class="w-6/12">
    <el-form-item label="Дата заявки">
      <el-date-picker
        v-model="order.orderCreateDate"
        type="date"
        format="DD-MM-YYYY"
        value-format="DD-MM-YYYY"
        placeholder="Pick a day"
        size="default"
      />
    </el-form-item>
    <el-form-item label="Даты перевозки">
      <el-date-picker
        v-model="order.shipmentDate"
        type="daterange"
        format="DD-MM-YYYY"
        value-format="DD-MM-YYYY"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        size="default"
      />
    </el-form-item>
    <el-form-item label="Перевозчик">
      <el-select
        v-model="order.carrier"
        @change="getCarrier"
        value-key="uid"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="(item, index) in allCarriers"
          :key="index"
          :label="item.name"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Тягач">
      <el-select
        v-model="order.truck"
        value-key="uid"
        class="m-2"
        placeholder="Выбрать"
        size="large"
      >
        <el-option
          v-for="(item, index) in getCarriersTrucks"
          :key="index"
          :label="`${item.mark} / ${item.registrationNumber}`"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Прицеп">
      <el-select
        v-model="order.trailer"
        value-key="uid"
        class="m-2"
        placeholder="Выбрать"
        size="large"
      >
        <el-option
          v-for="(item, index) in getCarriersTrailers"
          :key="index"
          :label="`${item.mark} / ${item.registrationNumber}`"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Водитель">
      <el-select
        v-model="order.driver"
        value-key="uid"
        class="m-2"
        placeholder="Выбрать"
        size="large"
      >
        <el-option
          v-for="(item, index) in getCarriersDrivers"
          :key="index"
          :label="item.driverName"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Клиент">
      <el-select
        v-model="order.client"
        @change="ordersStore.fetchClient"
        value-key="uid"
        class="m-2"
        placeholder="Выбрать"
        size="large"
      >
        <el-option
          v-for="(item, index) in getClients"
          :key="index"
          :label="item.name"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Валюта">
      <el-select
        v-model="order.currency"
        value-key="uid"
        class="m-2"
        placeholder="Выбрать"
        size="large"
      >
        <el-option
          v-for="(item, index) in currencies"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Описание груза">
      <el-input
        v-model="order.cargo"
        autosize
        type="textarea"
        placeholder="Описание груза"
      />
    </el-form-item>
    <el-form-item label="Стоимость для перевозчика">
      <el-input v-model="order.carrierPrice" placeholder="Введите стоимость" />
    </el-form-item>
    <el-form-item label="Стоимость для заказчика">
      <el-input v-model="order.clientPrice" placeholder="Введите стоимость" />
    </el-form-item>
    <el-form-item label="Откуда">
      <el-input
        v-model="order.fromPoint"
        autosize
        type="textarea"
        placeholder="Введите место загрузки"
      />
    </el-form-item>
    <el-form-item label="Куда">
      <el-input
        v-model="order.toPoint"
        autosize
        type="textarea"
        placeholder="Введите место выгрузки"
      />
    </el-form-item>
  </el-form>
  <el-button class="mt-12" @click="save()" type="success">Сохранить</el-button>
</template>

<script setup lang="ts">
import { ref, computed, ComputedRef, onBeforeMount } from "vue";
import { ICompanyDto, IVehicle, IDriver } from "@/types";
import { storeToRefs } from "pinia";
import { useOrdersStore } from "@/stores/orders.store";
import { useCompaniesStore } from "@/stores/companies.store";
import { useRoute, useRouter } from "vue-router";

const { query } = useRoute();

const router = useRouter();
const ordersStore = useOrdersStore();
const companiesStore = useCompaniesStore();

const {
  order,
  getCarriersTrucks,
  getCarriersTrailers,
  getCarriersDrivers,
  getClients,
  currencies,
} = storeToRefs(ordersStore);

onBeforeMount(async () => {
  await ordersStore.fetchContractors();
  if (query.orderUid) {
    await ordersStore.fetchOrder(query.orderUid as string);
    await ordersStore.fetchCarrier(order.value.carrier);
  }
});

const allCarriers = computed(() => {
  return [...ordersStore.getCariers, companiesStore.company];
});

const getCarrier = async (data: ICompanyDto) => {
  await ordersStore.fetchCarrier(data);
  order.value.truck = <IVehicle>{};
  order.value.trailer = <IVehicle>{};
  order.value.driver = <IDriver>{};
};

const save = async () => {
  if (query.orderUid) {
    await ordersStore.updateOrder(query.orderUid as string);
  } else {
    await ordersStore.fetchLastOrder();
    await ordersStore.createOrder();
    router.push({ query: { orderUid: order.value.uid } });
  }
};
</script>
<style>
.el-form-item__label {
  height: auto;
  line-height: 1.5;
  justify-content: flex-start;
}
</style>
