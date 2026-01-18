<template>
    <nav class="navbar">
        <slot></slot>
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

}
</style>
