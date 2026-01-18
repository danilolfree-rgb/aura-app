<template>
    <section class="how-it-works">
        <h2 class="section-title">Em 3 passos simples</h2>
        <div class="steps-container">
            <div data-aos="slide-right" class="step">
                <div class="step-number">01</div>
                <h3>Conecte</h3>
                <p>Importe seus dados ou adicione manualmente seus ganhos.</p>
            </div>
            <div data-aos="slide-left" class="step">
                <div class="step-number">02</div>
                <h3>Categorize</h3>
                <p>Separe despesas fixas de variáveis com um clique.</p>
            </div>
            <div data-aos="slide-right" class="step">
                <div class="step-number">03</div>
                <h3>Visualize</h3>
                <p>Entenda sua "sobra real" através de gráficos limpos.</p>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.how-it-works {
    padding: 30px 0;
    text-align: center;

    .section-title {
        font-size: clamp(2rem, 7vw, 4rem);
        margin-bottom: 60px;
        font-weight: 700;
    }

    .steps-container {
        display: flex;
        justify-content: center;
        gap: 3rem;
        flex-wrap: wrap;

        .step {
            max-width: 250px;
            position: relative;

            .step-number {
                font-size: 4rem;
                font-weight: 900;

                background: linear-gradient(180deg, #6366f1 0%, rgba(99, 102, 241, 0.3) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;


                filter: drop-shadow(5px 5px 1px rgba(255, 3, 251, 0.347));
            }

            h3 {
                font-size: 1.5rem;
                margin-bottom: 10px;
                color: #818cf8;
            }

            p {
                color: rgba(255, 255, 255, 0.6);
                line-height: 1.5;
            }
        }
    }
}
</style>