<template>
    <button class="btn-access" @click="$router.push('/login')"> Entrar </button>
</template>

<style lang="scss" scoped>
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
</style>