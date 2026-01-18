<template>
    <section class="interactive-section" @mousemove="handleMouseMove" @mouseleave="resetCard">
        <div class="card-wrapper" :style="cardStyle">
            <div class="main-card">
                <div class="card-header">
                    <span>Status Mensal</span>
                    <div class="dot"></div>
                </div>

                <div class="balance">
                    <label>Sobra Real</label>
                    <h1>R$ 1.240,00</h1>
                </div>

                <div class="floating-element income" :style="layerStyle(40)">
                    <span class="icon">↑</span>
                    <div>
                        <small>Ganhos</small>
                        <p>+ R$ 3.500</p>
                    </div>
                </div>

                <div class="floating-element expense" :style="layerStyle(20)">
                    <span class="icon">↓</span>
                    <div>
                        <small>Gastos</small>
                        <p>- R$ 2.260</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="info-text">
            <h2>Sinta o controle na <span class="gradient-text">ponta dos dedos.</span></h2>
            <p class="subtitle">Uma interface que responde a você. Literalmente.</p>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const rotateX = ref(0);
const rotateY = ref(0);

const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calcula a rotação baseada na posição do mouse
    rotateX.value = ((clientY / innerHeight) - 0.5) * -20;
    rotateY.value = ((clientX / innerWidth) - 0.5) * 20;
};

const resetCard = () => {
    rotateX.value = 0;
    rotateY.value = 0;
};

const cardStyle = computed(() => ({
    transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`
}));

const layerStyle = (offset) => computed(() => ({
    transform: `translateZ(${offset}px) translateX(${rotateY.value * 0.5}px)`
})).value;
</script>

<style lang="scss" scoped>
@use '../../assets/_mixins.scss' as mxs;

.interactive-section {
    display: flex;
    align-items: center;
    justify-content: space-around;
    perspective: 1000px;
    margin-top: 30px;
    gap: 30px;

    @media (max-width: 900px) {
        flex-direction: column;
        text-align: center;
    }
}

.card-wrapper {
    transition: transform 0.1s ease-out;
    transform-style: preserve-3d;
    max-width: 350px;
    height: 300px;
}

.main-card {
    @include mxs.glass;
    width: 100%;
    height: 100%;
    border-radius: 40px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    transform-style: preserve-3d;
    background: rgba(255, 255, 255, 0.05);

    .card-header {
        position: absolute;
        top: 20px;
        left: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.8rem;

        .dot {
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
            box-shadow: 0 0 10px #22c55e;
        }
    }

    .balance {
        h1 {
            font-size: 2.5rem;
            margin-top: 10px;
        }

        label {
            color: #818cf8;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    }
}

.floating-element {
    position: absolute;
    @include mxs.glass;
    padding: 6px 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.08);

    &.income {
        top: 60px;
        right: -40px;
        border-left: 4px solid #22c55e;
    }

    &.expense {
        bottom: 30px;
        left: -40px;
        border-left: 4px solid #ef4444;
    }

    .icon {
        font-size: 1.2rem;
        font-weight: bold;
    }

    small {
        color: rgba(255, 255, 255, 0.5);
        display: block;
    }

    p {
        font-weight: bold;
    }
}

.info-text {
    max-width: 450px;

    h2 {
        font-size: clamp(2rem, 7vw, 4rem);
        line-height: 1.1;
        margin-bottom: 20px;
    }

    .subtitle {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.6);
        max-width: 600px;
        line-height: 1.6;
        margin-bottom: 40px;
    }

    .gradient-text {
        background: linear-gradient(90deg, #6366f1, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
</style>