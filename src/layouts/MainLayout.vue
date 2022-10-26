<template>
  <div>
    <v-app-bar
      absolute
      dense
      color="teal"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      logo
      <v-spacer></v-spacer>
      <v-tabs slider-color="yellow" fixed-tabs dark>
        <v-tab v-for="(item, i) in items" :key="i" :to="item.path">
          {{ item.name }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main class="pt-12">
      <slot />
    </v-main>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      items: [
        {
          name: 'Главная',
          path: '/'
        },
        {
          name: 'Компания',
          path: '/company'
        },
        {
          name: 'Автопарк',
          path: '/vehicles'
        },
        {
          name: 'Финансы',
          path: '/finance'
        },
        {
          name: 'Пользователь',
          path: '/user'
        }
      ]
    };
  },

  async created () {
    await this.fetchData({ module: 'companies', type: 'Company' });
  },

  methods: {
    ...mapActions(['fetchData'])
  }
};
</script>

<style>
</style>
