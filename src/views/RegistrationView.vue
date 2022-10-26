<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters class="fill-height">
      <v-col
        cols="12"
        md="4"
        :class="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs ? 'mb-4' : ''"
      >
        <v-card
          class="fill-height d-flex flex-column justify-center align-center"
        >
          <v-card-title primary-title> Добро пожаловать </v-card-title>
          <v-card-text class="text-center">
            Если у Вас уже есть аккаунт в LogProg, тогда нажмите “Войти”
          </v-card-text>
          <v-card-actions>
            <v-btn to="/login" color="success">Войти</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="7">
        <v-card
          class="fill-height d-flex flex-column justify-center align-center"
        >
          <v-card-title primary-title> Регистрация </v-card-title>
          <v-form class="auth-form-width" @submit.prevent="signUp">
            <v-text-field
              v-model="regForm.userName"
              label="Ваше имя"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="regForm.companyName"
              label="Название организации"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="regForm.companyUid"
              label="УНП"
              hide-details="auto"
            ></v-text-field>
            <v-select
              v-model="regForm.organizationType"
              :items="organizationTypes"
              item-text="title"
              item-value="type"
              label="Тип организации"
              hide-details="auto"
            ></v-select>
            <v-text-field
              v-model="regForm.phoneNumber"
              label="Номер телефона"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="regForm.email"
              label="Email"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :type="'password'"
              label="Пароль"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              v-model="repeatedPassword"
              :type="'password'"
              label="Подтвердить пароль"
              hide-details="auto"
            ></v-text-field>
            <v-checkbox v-model="regForm.terms" color="green">
              <template v-slot:label>
                <div @click.stop="">
                  Прочел
                  <a href="#" @click.prevent="terms = true">правила</a>
                  приложения
                </div>
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="regForm.dataAgreements"
              color="green"
              class="mt-0"
            >
              <template v-slot:label>
                <div @click.stop="">
                  <a href="#" @click.prevent="terms = true"
                    >Согласен на передачу и обработку пользовательских данных</a
                  >
                </div>
              </template>
            </v-checkbox>
            <v-btn type="submit" color="success">Регистрация</v-btn>
          </v-form>
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
      organizationTypes: [
        { title: 'Перевозчик', type: 0 },
        { title: 'Экспедитор', type: 1 },
        { title: 'Грузополучатель / Грузоотправитель', type: 2 }
      ],
      regForm: {
        userName: '',
        companyName: '',
        companyUid: null,
        organizationType: {},
        phoneNumber: null,
        email: '',
        terms: false,
        dataAgreements: false
      },
      password: null,
      repeatedPassword: null
    };
  },

  methods: {
    ...mapActions('users', ['createUserEmailPassword']),

    signUp () {
      this.createUserEmailPassword(this.regForm, this.password).then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>

<style>
</style>
