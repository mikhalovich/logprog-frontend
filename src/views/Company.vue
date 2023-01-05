<template>
  <div>СДЕЛАТЬ ВЫБОРА ТИПА КОМПАНИИ и Множественное добавление счетов в банке</div>
  <div v-if="!isCompanyLoaded" class="pt-20" v-loading="!isCompanyLoaded"></div>
  <el-form v-if="isCompanyLoaded" label-width="160px" class="w-6/12">
    <el-form-item label="Название компании">
      <el-input v-model="company.name" placeholder="Введите ФИО водителя" />
    </el-form-item>
    <el-form-item label="Должность ответственного">
      <el-input v-model="company.post" placeholder="Введите контакты водителя" />
    </el-form-item>
    <el-form-item label="ФИО ответственного">
      <el-input v-model="company.signsName" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="УНП/ИНН">
      <el-input v-model="company.details.taxUid" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="Номер счета в банке">
      <el-input v-model="company.details.bankAccount" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="Реквизиты банка">
      <el-input v-model="company.details.bankDetails" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="Юридический адрес">
      <el-input v-model="company.details.legalAddress" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="Почтовый адрес">
      <el-input v-model="company.details.mailAddress" placeholder="Please input" />
    </el-form-item>
    <el-form-item label="Контакты">
      <el-input v-model="company.details.contacts" placeholder="Please input" />
    </el-form-item>
  </el-form>
  <el-button class="mt-12" @click="save()" type="success">Сохранить</el-button>
</template>

<script setup lang="ts">
import { useCompaniesStore } from "@/stores/companies.store";
import { storeToRefs } from "pinia";

const companiesStore = useCompaniesStore();

const { company, isCompanyLoaded } = storeToRefs(companiesStore);

const save = () => {
  companiesStore.saveCompany(company.value.uid);
};
</script>
