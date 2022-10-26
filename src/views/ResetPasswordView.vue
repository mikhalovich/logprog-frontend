<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters class="fill-height">
      <v-col
        cols="12"
        md="7"
      >
        <v-card class="fill-height d-flex flex-column justify-center align-center">
          <v-card-title primary-title>
            Войти в систему
          </v-card-title>
          <v-form
            class="auth-form-width"
            @submit.prevent="submit"
          >
            <v-text-field
              v-model="resetForm.password"
              :type="'password'"
              label="Пароль"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="resetForm.repeatedPassword"
              :type="'password'"
              label="Подтвердить пароль"
              hide-details="auto"
            ></v-text-field>
            <v-btn class="mt-6" type="submit" color="success">Сохранить пароль</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
        cols="12"
        md="4"
        :class="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? 'mt-4' : ''"
      >
        <v-card class="fill-height d-flex justify-center align-center">
          <v-card-actions class="flex-column">
            <v-btn to="/registration" color="success">Регистрация</v-btn>
            <v-btn class="mt-6" to="/login" color="success">Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RegistrationView',
  data () {
    return {
      resetForm: {
        password: '',
        repeatedPassword: ''
      }
    };
  }
};
</script>

<style>

</style>
