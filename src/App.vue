<template>
  <div class="app-wrapper">
    <router-view />
  </div>
  <BaseModal :isOpen="activeModal === 'register'" @close="closeModal">
    <ModalRegister />
  </BaseModal>
</template>

<script setup>
import { onMounted, ref, provide } from 'vue'; // 1. Importar o onMounted
import { RouterView } from 'vue-router';
import BaseModal from './components/common/BaseModal.vue';
import ModalRegister from './components/loginPg/ModalRegister.vue';
import AOS from 'aos';

const activeModal = ref(null);

// Função que qualquer componente poderá usar
const openModal = (name) => { activeModal.value = name; };
const closeModal = () => { activeModal.value = null; };

// "Provedor" global do Vue
provide('modalActions', { openModal, closeModal });

// 2. Mover as inicializações para o hook de montagem
onMounted(() => {

  AOS.init({
    duration: 600,
    easing: 'ease',
    offset: 100,
  });
});
</script>

<style lang="scss">
@use './assets/reset';
@use './assets/utils';
</style>
