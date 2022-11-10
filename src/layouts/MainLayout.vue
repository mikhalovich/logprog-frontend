<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        :ellipsis="false"
      >
        <el-menu-item index="0">LOGO</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item
          v-for="(item, index) in items"
          :key="index"
          :index="`${index + 1}`"
          :route="item.path"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import { useCompaniesStore } from "@/stores/companies.store";

interface Item {
  name: string;
  path: string;
}

const companiesStore = useCompaniesStore();

onBeforeMount(async () => {
  await companiesStore.fetchCompany();
});

const activeIndex = ref("1");
const items: Item[] = reactive([
  {
    name: "Главная",
    path: "/",
  },
  {
    name: "Компания",
    path: "/company",
  },
  {
    name: "Автопарк",
    path: "/vehicles",
  },
  {
    name: "Финансы",
    path: "/finance",
  },
  {
    name: "Пользователь",
    path: "/user",
  },
]);
</script>
