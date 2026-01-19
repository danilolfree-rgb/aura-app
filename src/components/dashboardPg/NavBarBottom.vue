<template>
    <nav class="bottom-nav">

        <router-link to="/home" class="nav-item" active-class="active">

            <span class="icon">
                <Icons class="svg" name="home" />
            </span>

        </router-link>

        <router-link to="/extract" class="nav-item" active-class="active">

            <span class="icon">
                <Icons class="svg" name="extract" />
            </span>

        </router-link>

        <div @click="ui.closeFab" class="fab-wrapper">
            <button class="fab-main" @click="openFab">
                <span>
                    +
                </span>
            </button>

            <div v-if="stateFab" class="fab-options" id="fabOptions">
                <button onclick="abrirModal('modalGasto'); toggleFab()">💸 Gasto</button>
                <button onclick="abrirModal('modalRenda'); toggleFab()">💰 Renda</button>
                <button onclick="abrirModal('modalReserva'); toggleFab()">🏦 Reserva</button>
            </div>

        </div>

        <router-link to="/goals" class="nav-item" active-class="active">

            <span class="icon">
                <Icons class="svg" name="reserve" />
            </span>

        </router-link>

        <router-link to="/user" class="nav-item" active-class="active">

            <span class="icon">
                <Icons class="svg" name="user" />
            </span>

        </router-link>
    </nav>
</template>

<script setup>
import Icons from '../../assets/Icons.vue';
import { RouterLink } from 'vue-router';
import { ref } from 'vue'

const stateFab = ref(false)

function openFab() {
    if (stateFab.value) {
        return stateFab.value = false
    } else {
        return stateFab.value = true
    }
}

</script>

<style lang="scss" scoped>
@use '../../assets/colors' as color;

.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background: color.$nav-bg;
    backdrop-filter: blur(13px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: env(safe-area-inset-bottom);
    /* Suporte para iPhone X+ */
    z-index: 1000;

    .nav-item {
        background: none;
        border: none;
        color: #94a3b8;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.7rem;
        cursor: pointer;
        transition: 0.3s;
        text-decoration: none;
    }

    .icon {
        font-size: 1.2rem;
    }

    .lmenu {
        font-size: 0.6rem;
    }

    .fab-wrapper {
        position: relative;
        top: -20px;

        .fab-main {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: color.$accent;
            color: white;
            border: none;
            font-size: 24px;
            box-shadow: 0 1px 10px rgba(99, 102, 241, 0.4);
            cursor: pointer;
        }

        .fab-options {
            position: absolute;
            bottom: 70px;
            left: 50%;
            transform: translateX(-50%);
            flex-direction: column;
            gap: 10px;
            width: 140px;

            button {
                background: #1e293b;
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 12px;
                border-radius: 12px;
                font-size: 0.8rem;
                cursor: pointer;
            }
        }
    }

}
</style>