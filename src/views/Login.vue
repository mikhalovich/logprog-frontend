<template>
  <el-row :gutter="20" align="middle" justify="center" class="w-screen">
    <el-col :span="16" class="flex items-center">
      <el-form :model="form" label-width="120px" class="w-full">
        <el-form-item label="Email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSubmit">Логин</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="8">
      <div class="text-center mb-4">Добро пожаловать</div>
      <div class="text-center mb-4">
        Если у Вас ещё нет аккаунта в LogProg, тогда нажмите “Регистрация”
      </div>
      <el-button type="success" @click="router.push({ path: '/registration' })"
        >Регистрация</el-button
      >
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useUsersStore } from "@/stores/users.store";
import { useRouter } from "vue-router";
const router = useRouter();

const usersStore = useUsersStore();

interface LoginForm {
  email: string;
  password: string;
}

const form: LoginForm = reactive({
  email: "",
  password: "",
});

const onSubmit = () => {
  usersStore.signInUserEmailPassword(form).then(() => {
    router.push({ name: "home" });
  });
};
</script>
