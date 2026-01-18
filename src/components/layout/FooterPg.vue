<template>
    <footer class="aura-footer">
        <div class="footer-content">
            <span class="footer-brand">AURA</span>
            <nav>
                <ul class="footer-links">
                    <li><a class="link" href="#">Privacidade</a></li>
                    <li><a class="link" href="#">Ajuda</a></li>
                    <li><a class="link" href="#">Feedback</a></li>
                </ul>
            </nav>
            <p class="copyw">&copy; 2026 Aura - Controle Financeiro ✨</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../../assets/colors' as color;

.aura-footer {
    width: 100%;
    padding: 2rem 1rem;
    margin-top: 50px;
    background: color.$card-bg;
    backdrop-filter: blur(10px);
    border-top: 1px solid color.$glass-border;
    text-align: center;
    z-index: 10;

    .footer-brand {
        font-weight: 700;
        background: color.$aura-effect;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 1rem;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        .footer-links {
            display: flex;
            gap: 1.5rem;
            list-style: none;
            padding: 0;

            .link {
                color: #64748b;
                text-decoration: none;
                font-size: 0.8rem;
                transition: color 0.3s ease;

                &:hover {
                    color: #818cf8;
                }
            }

        }

        .copyw {
            color: #94a3b8;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
        }
    }

}
</style>