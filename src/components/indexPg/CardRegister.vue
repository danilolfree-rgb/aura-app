<template>
    <section class="final-cta">
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>

        <div class="cta-content">
            <span class="pre-title">Comece hoje mesmo</span>
            <h2>Pronto para transformar sua <br> <span class="highlight">relação com o dinheiro?</span></h2>
            <p>Junte-se a milhares de pessoas que já simplificaram sua gestão financeira com o Aura.</p>

            <div class="cta-actions">
                <button class="btn-primary btn-huge" @click="$router.push('/login')">Criar minha conta gratuita</button>
                <span class="trial-text">Sem cartão de crédito necessário.</span>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../../assets/mixins' as mxs;

.final-cta {
    position: relative;
    margin: 150px 0 80px 0;
    padding: 100px 20px;
    @include mxs.glass;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 40px;
    text-align: center;
    overflow: hidden; // Mantém os brilhos dentro da caixa
    border: 1px solid rgba(99, 102, 241, 0.2);

    .cta-content {
        position: relative;
        z-index: 2; // Fica acima dos orbes
    }

    .pre-title {
        text-transform: uppercase;
        letter-spacing: 3px;
        font-size: 0.9rem;
        color: #818cf8;
        font-weight: 700;
    }

    h2 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 20px 0;
        line-height: 1.2;

        .highlight {
            color: #a855f7;
            text-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
        }
    }

    p {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.7);
        max-width: 600px;
        margin: 0 auto 40px auto;
    }

    .cta-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;

        .btn-huge {
            padding: 20px 40px;
            font-size: 1.2rem;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            border: none;
            border-radius: 30px;
            transition: 0.3s;
            box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);

            &:hover {
                transform: scale(1.05);
                box-shadow: 0 20px 45px rgba(99, 102, 241, 0.6);
            }
        }

        .trial-text {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.4);
        }
    }

    // --- ORBES DE BRILHO ---
    .glow-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        z-index: 1;
        opacity: 0.4;
    }

    .orb-1 {
        width: 300px;
        height: 300px;
        background: #6366f1;
        top: -150px;
        left: -100px;
    }

    .orb-2 {
        width: 250px;
        height: 250px;
        background: #a855f7;
        bottom: -100px;
        right: -50px;
    }
}
</style>