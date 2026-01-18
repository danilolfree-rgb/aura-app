<template>
    <div class="feature-card">
        <div class="icon-box">{{ icon }}</div>
        <h2 class="title-card">{{ title }}</h2>
        <p class="content-card">{{ description }}</p>
    </div>
</template>

<script setup>
defineProps({
    icon: String,
    title: String,
    description: String
})
</script>

<style lang="scss" scoped>
@use '../../assets/colors' as color;

.feature-card {
    background: color.$card-bg;
    padding: 30px;
    border-radius: 28px;
    max-width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-5px);
        border-color: rgba(99, 102, 241, 0.3);
        background: rgba(15, 23, 42, 0.8);
    }

    .content-card {
        color: color.$small-text;
        font-size: 14px;
        line-height: 1.6;
        margin: 0;
    }

    .icon-box {
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin-bottom: 20px;
    }

    .title-card {
        font-weight: 700;
        margin-bottom: 12px;
        font-size: 18px;
    }
}
</style>