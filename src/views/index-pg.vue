<template>
    <AnimBackIndex />
    <NavBar>
        <Logo />
        <ButtonEnter />
    </NavBar>
    <section class="landing-page">
        <Introduction data-aos="fade-up" />
        <StepsSession />
        <InteractiveCard data-aos="fade" />
        <CardRegister data-aos="flip-left" />
        <section class="stats">
            <div class="stat-item"><span>+10k</span> Usuários</div>
            <div class="stat-item"><span>100%</span> Seguro</div>
            <div class="stat-item"><span>24/7</span> Suporte</div>
        </section>
    </section>
    <FooterPg />
</template>

<script setup>
import FooterPg from '../components/layout/FooterPg.vue';
import AnimBackIndex from '../components/indexPg/AnimBackIndex.vue';
import NavBar from '../components/layout/NavBar.vue';
import CardRegister from '../components/indexPg/CardRegister.vue';
import StepsSession from '../components/indexPg/StepsSession.vue';
import Introduction from '../components/indexPg/Introduction.vue';
import InteractiveCard from '../components/indexPg/InteractiveCard.vue';
import ButtonEnter from '../components/common/ButtonEnter.vue';
import Logo from '../components/common/Logo.vue';
</script>

<style lang="scss">
@use '../assets/colors' as color;
@use '../assets/_mixins.scss' as mxs;

.landing-page {
    color: white;
    padding: 0 20px;
    margin-top: 60px;
    overflow-x: hidden;

    .stats {
        display: flex;
        justify-content: center;
        gap: 5vw;
        margin: 100px 0;
        padding: 40px;
        border-top: 1px solid rgba(255, 255, 255, 0.05);

        .stat-item {
            text-align: center;
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.9rem;

            span {
                display: block;
                color: white;
                font-weight: 700;
                font-size: 1.8rem;
                margin-bottom: 5px;
            }
        }
    }
}

@media (max-width: 768px) {

    // Mudei para 768px que é o padrão tablet/celular
    .landing-page .navbar {
        padding: 1rem 20px;

        .nav-links {
            display: none; // Esconde os links no celular para não quebrar o layout
        }

        .logo {
            font-size: 1.2rem;
        }
    }
}

// Responsividade para celular
@media (max-width: 600px) {
    .landing-page .cta-group {
        flex-direction: column;
        width: 100%;

        button {
            width: 100%;
        }
    }

    .landing-page .stats {
        flex-direction: column;
        gap: 2rem;
    }
}
</style>