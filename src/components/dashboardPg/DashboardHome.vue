<script setup lang="ts">
import BaseScreen from '../common/BaseScreen.vue';
import { ref, onMounted } from 'vue';

// 1. Definição dos dados (constantes)
const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio",
    "Junho", "Julho", "Agosto", "Setembro", "Outubro",
    "Novembro", "Dezembro"
];

// 2. Estado reativo: inicia com o mês atual
const mesSelecionado = ref(meses[new Date().getMonth()]);

// 3. Definição do evento para avisar o componente Pai (o callback)
const emit = defineEmits(['mudou']);

// 4. Função disparada ao trocar o valor
const handleChange = () => {
    emit('mudou', mesSelecionado.value);
};

// 5. Envia o valor inicial assim que o componente carrega (opcional)
onMounted(() => {
    emit('mudou', mesSelecionado.value);
});
</script>

<template>
    <nav class="navbar-aura">
        <div class="nav-container">
            <div class="logo-aura">
                <div class="logo-icon">A</div>
                <span>AURA</span>
            </div>
            <div class="d-flex align-items-center gap-3">
                <select id="mesGlobal" v-model="mesSelecionado" @change="handleChange" class="select-custom">
                    <option v-for="mes in meses" :key="mes" :value="mes">
                        {{ mes }}
                    </option>
                </select>
                <button onclick="deslogar()" class="btn btn-outline-danger btn-sm border-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>
    <BaseScreen>
        <div class="header-section mb-4">
            <h4 id="tituloSaudacao" style="font-weight: 800; color: white; margin-bottom: 4px;">Olá!</h4>
            <p id="subtituloAura" style="color: #64748b; font-size: 14px; margin-bottom: 0;">Carregando seu
                resumo...
            </p>
        </div>

        <div class="insight-card-aura">
            <section class="balance-field">
                <span class="form-label">Balanço Disponível</span>
                <h1 id="saldoTotal">R$ 0,00</h1>

                <div class="summary-pills">
                    <div class="pill positive">
                        <span class="dot"></span>
                        <small>Ganhos</small>
                        <span id="resumoGanhos" class="skeleton">R$ 0,00</span>
                    </div>
                    <div class="pill negative">
                        <span class="dot"></span>
                        <small>Gastos</small>
                        <span id="resumoGastos" class="skeleton">R$ 0,00</span>
                    </div>
                </div>
            </section>
            <section class="insights-section">
                <div class="insight-tabs">
                    <button id="tab-btn" class="tab-btn" onclick="mostrarInsight('categoria')">🏷️
                        Categoria</button>
                    <button id="tab-second-btn" class="tab-btn" onclick="mostrarInsight('pagamento')">💳
                        Pagamento</button>
                    <button id="btn-insight-quem" class="tab-btn" onclick="mostrarInsight('quem', event)">👥
                        Responsável</button>
                </div>

                <div id="insight-display" class="insight-card-aura">
                    <div class="insight-content">
                        <span id="insight-label">Carregando análise...</span>
                        <h3 id="insight-value">---</h3>
                        <small id="insight-detail">---</small>
                    </div>
                </div>
            </section>
        </div>
    </BaseScreen>
</template>
<style lang="scss" scoped>
@use '../../assets/colors' as color;

.navbar-aura {
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 12px 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
}

/* O segredo está aqui: forçamos o alinhamento horizontal */
.nav-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
}

.logo-aura {
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    /* Impede que o texto AURA quebre */
}

#mesGlobal {
    /* Remova qualquer margin-top que possa existir */
    margin: 0 !important;
    background: rgba(30, 41, 59, 0.5);
    color: #f8fafc;
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 8px 16px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
}

.insight-card-aura {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 28px;
    padding: 30px;
    margin-top: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

    .balance-field {
        padding: 40px 20px;
        text-align: center;
        background: radial-gradient(circle at center, rgba(129, 140, 248, 0.08) 0%, transparent 70%);

        .label {
            color: color.$small-text;
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        h1 {
            font-size: 3.2rem;
            font-weight: 200;
            margin: 10px 0 30px;
            letter-spacing: -1px;
        }
    }

    .summary-pills {
        display: flex;
        justify-content: center;
        gap: 12px;

        .pill {
            background: color.$bg-dark;
            border: 1px solid color.$glass-border;
            padding: 8px 16px;
            border-radius: 100px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: 0.3s;

            small {
                color: color.$small-text;
                font-size: 10px;
            }

            span {
                font-weight: 600;
                font-size: 13px;
            }

            &.positive {
                box-shadow: 0 0px 5px -1px color.$positive;

                &.positive span {
                    color: color.$positive;
                }

                &.positive:hover {
                    translate: 0 5px;
                }
            }

            &.negative {
                box-shadow: 0 0px 5px -1px color.$negative;

                &.negative span {
                    color: color.$negative;
                }

                &.negative:hover {
                    translate: 0 5px;
                }
            }

            .dot {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: currentColor;
            }
        }
    }

    .insight-tabs {
        display: flex;
        gap: 10px;
        margin-bottom: 12px;
        overflow-x: auto;
        padding-bottom: 5px;

        .tab-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #94a3b8;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.8rem;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.3s ease;
        }
    }

}
</style>