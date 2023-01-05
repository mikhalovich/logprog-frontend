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
        <el-menu-item index="">LOGO</el-menu-item>
        <!-- <el-menu-item index="1"> Главная </el-menu-item>
        <el-menu-item index="2"> Компания </el-menu-item>
        <el-menu-item index="3"> Автопарк </el-menu-item>
        <el-menu-item index="4" :route="'/finance'"> Финансы </el-menu-item>
        <el-menu-item index="5" :route="'/user'"> Пользователь </el-menu-item> -->
        <div class="flex-grow" />
        <el-menu-item
          v-for="(item, index) in items"
          :key="index"
          :index="`${item.path}`"
          :route="{ name: item.name }"
        >
          {{ item.title }}
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
  title: string;
  path: string;
  name: string;
}

const companiesStore = useCompaniesStore();

onBeforeMount(async () => {
  await companiesStore.fetchCompany();
});

const activeIndex = ref("/");
const items: Item[] = reactive([
  {
    title: "Главная",
    path: "/",
    name: "home",
  },
  {
    title: "Компания",
    path: "/company",
    name: "company",
  },
  {
    title: "Автопарк",
    path: "/staff",
    name: "staff",
  },
  // {
  //   title: "Финансы",
  //   path: "/finance",
  //   name: "Finance"
  // },
  {
    title: "Пользователь",
    path: "/user",
    name: "user",
  },
]);

// const handleSelect = (key: string, keyPath: string[], item: {}) => {
//   console.log(item);
//   // activeIndex = key as string
// };
</script>
