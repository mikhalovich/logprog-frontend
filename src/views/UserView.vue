<template>
  <v-container>
    <v-col cols="4">
      <v-text-field
        v-model="user.userName"
        label="Ваше имя"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        v-model="user.companyName"
        label="Название организации"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        v-model="user.companyUid"
        label="УНП"
        hide-details="auto"
      ></v-text-field>
      <v-select
        v-model="user.organizationType"
        :items="organizationTypes"
        item-text="title"
        item-value="type"
        label="Тип организации"
        hide-details="auto"
      ></v-select>
      <v-text-field
        v-model="user.phoneNumber"
        label="Номер телефона"
        hide-details="auto"
      ></v-text-field>
      <v-text-field
        v-model="user.email"
        label="Email"
        disabled
        hide-details="auto"
      ></v-text-field>
    </v-col>

    <v-btn @click="signOut" class="mt-6" color="error">Выйти</v-btn>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  // data () {
  //   return {
  //     user: {}
  //   };
  // },

  methods: {
    ...mapActions('users', ['signOutUser']),

    signOut () {
      this.signOutUser().then(() => {
        this.$router.push('/login');
      });
    }
  },

  computed: {
    ...mapState('company', ['organizationTypes']),
    ...mapGetters('users', { user: 'getCurrentUser' })
  }
};
</script>

<style></style>
