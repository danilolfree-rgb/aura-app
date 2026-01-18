<template>
    <div id="modalPerfil" v-if="isOpen" class="overlay" @click="$emit('close')">
        <div class="modal-content" @click.stop>
            <button class="close-btn" @click="close()">&times;</button>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { inject } from 'vue';
const { closeModal } = inject('modalActions');
function close() {
    closeModal()
}
defineProps(['isOpen']);
defineEmits(['close']);
</script>

<style lang="scss" scoped>
@use '../../assets/colors' as color;

.modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 32px;
    padding: 10px 30px;
    width: 90%;
    max-width: 300px;
    text-align: center;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.close-btn {
    padding: 0;
    font-size: 30px;
    background: transparent;
    border: none;
    color: color.$negative;
    cursor: pointer;
    transition: ease-out 0.2s;
    width: 100%;
    text-align: right;
    margin-left: 13px;

    &:hover {
        font-size: 32px;
        transform: translateY(-3px);
        filter: drop-shadow(0 0 10px color.$negative);
    }
}
</style>