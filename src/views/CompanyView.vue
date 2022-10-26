<template>
  <v-form ref="form">
    СДЕЛАТЬ ВЫБОРА ТИПА КОМПАНИИ
    <v-text-field
      :value="name"
      @input.native="updateField"
      name="name"
      label="Название компании"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      :value="post"
      @input.native="updateField"
      name="post"
      label="Должность ответственного"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      :value="signsName"
      @input.native="updateField"
      name="signsName"
      label="ФИО ответственного"
      hide-details="auto"
    ></v-text-field>
    <v-btn color="success" class="mt-4" @click="save">Сохранить</v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  // async created () {
  //   await this.fetchData({ module: 'companies', type: 'Company' });
  // },

  methods: {
    ...mapActions('companies', ['saveCompany']),
    ...mapMutations('companies', ['setCurrentCompany']),

    updateField (e) {
      this.setCurrentCompany({ [e.target.name]: e.target.value });
    },

    save () {
      this.saveCompany(this.$store.state.users.user.companyUid);
    }
  },

  computed: {
    ...mapState({
      name: state => state.companies.company.name,
      post: state => state.companies.company.post,
      signsName: state => state.companies.company.signsName
    })
  }
};
</script>

<style></style>
