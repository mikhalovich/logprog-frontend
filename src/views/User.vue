<template>
  <el-form label-width="160px" class="w-6/12">
    <el-form-item label="Ваше имя">
      <el-input v-model="user.userName" placeholder="Введите имя" />
    </el-form-item>
    <el-form-item label="Название организации">
      <el-input v-model="user.companyName" placeholder="Введите название компании" />
    </el-form-item>
    <el-form-item label="УНП">
      <el-input v-model="user.taxId" placeholder="Введите УНП/ИНН" />
    </el-form-item>
    <el-form-item label="Тип организации">
      <el-select
        v-model="user.organizationType"
        value-key="uid"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="(item, index) in organizationTypes"
          :key="index"
          :label="item.name"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Номер телефона">
      <el-input v-model="user.phoneNumber" placeholder="Введите номер телефона" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="user.email" placeholder="Введите email" />
    </el-form-item>
  </el-form>

  <el-button class="mt-12" @click="save()" type="success">Сохранить</el-button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUsersStore } from "@/stores/users.store";

const usersStore = useUsersStore();

const { user } = storeToRefs(usersStore);
</script>
