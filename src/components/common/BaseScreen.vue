<template>
    <NavBar>
        <Logo />
        <button @click="deslogar" class="glass-btn-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
        </button>
    </NavBar>
    <section id="screen-init" class="app-screen">
        <slot></slot>
    </section>
</template>

<script setup>
import Logo from './Logo.vue';
import NavBar from '../layout/NavBar.vue';
import { useRouter } from 'vue-router';
import { authService } from '../../services/authService';
const router = useRouter()

const deslogar = async () => {
    await authService.logout();
    router.push('/');
};


</script>

<style lang="scss" scoped>
.app-screen {
    padding: 10px;
    padding-bottom: 100px;
    /* Espaço para não cobrir o conteúdo com o menu bottom */
    animation: fadeIn 0.3s ease;
}
</style>