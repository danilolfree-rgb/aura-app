<template>
    <div class="hero">
        <section class="introduction">
            <h1 class="title-landing">
                Domine suas finanças com <br>
                <span class="gradient-text">Clareza Visual</span>
            </h1>
            <p class="subtitle">
                Uma plataforma minimalista projetada para quem busca <br>
                precisão nos dados e elegância na gestão.
            </p>

            <div class="cta-group">
                <button class="btn-primary">Começar agora</button>
                <button class="btn-secondary">Ver demonstração</button>
            </div>
        </section>

        <div class="features-grid">
            <FeatureCard data-aos="slide-up" icon="📊" title="Visão Real"
                description="Saiba exatamente quanto sobra após todas as despesas." />
            <FeatureCard data-aos="fade-up" icon="🛡️" title="Segurança"
                description="Seus dados criptografados e salvos na nuvem." />
            <FeatureCard data-aos="fade-up" icon="📈" title="Evolução"
                description="Acompanhe o crescimento do seu patrimônio mês a mês." />
        </div>
    </div>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue';
</script>

<style lang="scss" scoped>
@use '../../assets/mixins' as mxs;

.hero {
    @include mxs.fade-up;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    gap: 60px;

    .introduction {
        max-width: 900px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .title-landing {
            font-size: clamp(2rem, 7vw, 4rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 20px;

            .gradient-text {
                background: linear-gradient(90deg, #6366f1, #a855f7);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
}

.cta-group {
    display: flex;
    gap: 1.5rem;
    justify-content: center;

    button {
        padding: 14px 32px;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
    }

    .btn-primary {
        background: #6366f1;
        border: none;
        color: white;
        box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);

        &:hover {
            background: #4f46e5;
            transform: translateY(-3px);
        }
    }

    .btn-secondary {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;

        &:hover {
            background: rgba(255, 255, 255, 0.05);
        }
    }
}

.features-grid {
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    margin: 0 auto;
}
</style>