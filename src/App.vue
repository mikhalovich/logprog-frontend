<template>
  <component :is="layout">
    <RouterView :key="$route.fullPath" />
  </component>
</template>

<script setup lang="ts">
import { useOrdersStore } from "@/stores/orders.store";
import { defineAsyncComponent, computed } from "vue";
import { useRoute } from "vue-router";

const layout = computed(() => {
  const { meta } = useRoute();
  return defineAsyncComponent(
    () => import(`./layouts/${meta.layout ?? "AppLayoutDefault"}.vue`)
  );
});
const ordersStore = useOrdersStore();
ordersStore.fetchOrders();
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
