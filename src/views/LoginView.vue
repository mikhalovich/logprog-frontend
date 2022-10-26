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
            @submit.prevent="signIn"
          >
            <v-text-field
              v-model="loginForm.email"
              label="Ваш email"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="loginForm.password"
              :type="'password'"
              label="Пароль"
              hide-details="auto"
            ></v-text-field>
            <v-btn class="mt-6" type="submit" color="success">Войти</v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
        cols="12"
        md="4"
        :class="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? 'mt-4' : ''"
      >
        <v-card class="fill-height d-flex flex-column justify-center align-center">
          <v-card-title primary-title>
            Добро пожаловать
          </v-card-title>
          <v-card-text class="text-center">
            Если у Вас ещё нет аккаунта в LogProg, тогда нажмите “Регистрация”
          </v-card-text>
          <v-card-actions>
            <v-btn to="/registration" color="success">Регистрация</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegistrationView',
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    };
  },

  methods: {
    ...mapActions('users', ['signInUserEmailPassword']),

    signIn () {
      this.signInUserEmailPassword(this.loginForm).then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>

<style>

</style>
