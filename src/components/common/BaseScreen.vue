<template>
    <section id="screen-init" class="app-screen">
        <slot></slot>
    </section>
</template>

<style lang="scss" scoped>
.app-screen {
    padding: 10px;
    padding-bottom: 100px;
    /* Espaço para não cobrir o conteúdo com o menu bottom */
    animation: fadeIn 0.3s ease;
}
</style>