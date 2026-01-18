<template>
    <nav class="navbar">
        <div class="logo">AURA</div>
        <button class="btn-access" @click="$router.push('/login')"> Entrar </button>
    </nav>
</template>

<style lang="scss" scoped>
@use '../../assets/colors' as color;
@use '../../assets/mixins' as mxs;

.navbar {

    @include mxs.navbar-style;
    @include mxs.glass;

    position: sticky;
    top: 0;
    z-index: 1000;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.6rem 5%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0;

    .btn-access {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 8px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            background: white;
            color: #000;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }
    }
}
</style>
