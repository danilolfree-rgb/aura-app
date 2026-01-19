<script setup lang="ts">
import BaseScreen from '../common/BaseScreen.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { formatarMoeda } from '../../utils/formatters';

import { authService } from '../../services/authService';
import { releasesService } from '../../services/releasesService'
import Icons from '../../assets/Icons.vue';

const nameUser = ref('Usuário');
const carregando = ref(true);
const saldoVisivel = ref(true);
const abaAtiva = ref('categoria');
const listaLancamentos = ref<any[]>([]); // Armazena os dados do banco
const router = useRouter()

// Configuração de meses
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const mesSelecionado = ref(meses[new Date().getMonth()]);

// CÁLCULOS DINÂMICOS (Baseados na lista que vem do banco)
const resumo = computed(() => {
    const renda = listaLancamentos.value
        .filter(i => i.tipo === 'renda')
        .reduce((acc, curr) => acc + Number(curr.valor), 0);

    const gastos = listaLancamentos.value
        .filter(i => i.tipo === 'gasto')
        .reduce((acc, curr) => acc + Number(curr.valor), 0);

    return {
        saldo: renda - gastos,
        renda,
        gastos
    };
});

const estatisticasGerais = computed(() => {
    const apenasGastos = listaLancamentos.value.filter(i => i.tipo === 'gasto');
    if (apenasGastos.length === 0) return null;

    // Maior Gasto Individual
    const maior = apenasGastos.reduce((m, a) => Number(a.valor) > Number(m.valor) ? a : m, apenasGastos[0]);

    // Pagamento mais frequente
    const contagemPagamentos = apenasGastos.reduce((acc, curr) => {
        acc[curr.pagamento] = (acc[curr.pagamento] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const maisUsado = Object.keys(contagemPagamentos).reduce((a, b) =>
        contagemPagamentos[a] > contagemPagamentos[b] ? a : b
    );

    // Quem mais gasta (Responsável)
    const contagemQuem = apenasGastos.reduce((acc, curr) => {
        acc[curr.responsavel] = (acc[curr.responsavel] || 0) + Number(curr.valor);
        return acc;
    }, {} as Record<string, number>);

    const maiorResponsavel = Object.keys(contagemQuem).reduce((a, b) =>
        contagemQuem[a] > contagemQuem[b] ? a : b, ""
    );

    return { maior, maisUsado, maiorResponsavel, totalResponsavel: contagemQuem[maiorResponsavel] };
});

const carregarDashboard = async () => {
    carregando.value = true;
    try {
        const user = await authService.getUsuarioLogado();

        if (!user) {
            router.push('/');
            return;
        }

        nameUser.value = user.primeiroNome;

        // Busca os lançamentos usando o serviço
        listaLancamentos.value = await releasesService.buscarPorMes(user.id, mesSelecionado.value);

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
    } finally {
        carregando.value = false;
    }
};

onMounted(carregarDashboard);
watch(mesSelecionado, carregarDashboard);

</script>

<template>
    <BaseScreen>
        <header class="bar-user-info">
            <div class="profile-section">
                <div class="avatar-glow">
                    <span class="avatar">{{ nameUser[0].toUpperCase() }}</span>
                </div>
                <div class="welcome-msg">
                    <small>Bem-vindo de volta,</small>
                    <h2>{{ nameUser }}</h2>
                </div>
            </div>
            <div class="actions">
                <div class="month-pill">
                    <select v-model="mesSelecionado">
                        <option v-for="mes in meses" :key="mes" :value="mes">{{ mes }}</option>
                    </select>
                </div>
            </div>
        </header>

        <div class="wallet-card" :class="{ 'card-loading': carregando }">
            <div class="card-inner">
                <div class="card-head">
                    <span>Saldo Aura</span>
                    <button @click="saldoVisivel = !saldoVisivel" class="blur-toggle">
                        <i v-if="saldoVisivel">
                            <Icons class="svg" name="open" />
                        </i><i v-else>
                            <Icons class="svg" name="lock" />
                        </i>
                    </button>
                </div>
                <h1 class="main-balance" :class="{ 'is-blurred': !saldoVisivel }">
                    {{ saldoVisivel ? formatarMoeda(resumo.saldo) : 'R$ ••••••' }}
                </h1>
                <div class="card-footer">
                    <div class="mini-stat">
                        <span class="label">Entradas</span>
                        <span class="val positive">+{{ formatarMoeda(resumo.renda) }}</span>
                    </div>
                    <div class="mini-stat">
                        <span class="label">Saídas</span>
                        <span class="val negative">-{{ formatarMoeda(resumo.gastos) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <section class="aura-brain-section">

            <div class="pills-scroll">
                <button v-for="t in ['categoria', 'pagamento', 'quem']" :key="t" @click="abaAtiva = t"
                    :class="['pill-item', { active: abaAtiva === t }]">
                    {{ t === 'categoria' ? '📂 Categoria' : t === 'pagamento' ? '💳 Método' : '👤 Responsável' }}
                </button>
            </div>

            <transition name="card-swap" mode="out-in">
                <div :key="abaAtiva" class="insight-card-modern">
                    <div v-if="!carregando && estatisticasGerais" class="insight-body">
                        <div v-if="abaAtiva === 'categoria'" class="insight-content">
                            <div class="icon-circle">
                                <Icons name="fire" class="fire" />
                            </div>
                            <div class="text-data">
                                <p>O maior vilão deste mês foi <strong>{{ estatisticasGerais.maior.descricao }}</strong>
                                </p>
                                <div class="progress-bar-container">
                                    <div class="progress-fill"
                                        :style="{ width: (estatisticasGerais.maior.valor / resumo.renda * 100) + '%' }">
                                    </div>
                                </div>
                                <small>Consumiu {{ Math.round(estatisticasGerais.maior.valor / resumo.renda * 100) }}%
                                    da sua renda</small>
                            </div>
                        </div>

                        <div v-if="abaAtiva === 'pagamento'" class="insight-content">
                            <div class="icon-circle">💳</div>
                            <div class="text-data">
                                <p>Você usou mais o <strong>{{ estatisticasGerais.maisUsado }}</strong></p>
                                <span class="insight-tip">Dica: Pagamentos em Pix costumam ter descontos de até
                                    10%.</span>
                            </div>
                        </div>

                        <div v-if="abaAtiva === 'quem'" class="insight-content">
                            <div class="icon-circle">👥</div>
                            <div class="text-data">
                                <p>Quem mais movimentou foi <strong>{{ estatisticasGerais.maiorResponsavel }}</strong>
                                </p>
                                <span class="highlight-val">{{ formatarMoeda(estatisticasGerais.totalResponsavel)
                                }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="loading-shimmer"></div>
                </div>
            </transition>
        </section>
    </BaseScreen>
</template>

<style lang="scss" scoped>
@use '../../assets/colors' as color;
@use '../../assets/mixins' as mxs;

// Estilo Geral da App Bar
.bar-user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;


    .profile-section {
        display: flex;
        align-items: center;
        gap: 10px;

        .avatar-glow {
            padding: 3px;
            background: linear-gradient(45deg, color.$accent, #8b5cf6);
            border-radius: 16px;

            .avatar {
                width: 45px;
                height: 45px;
                background: #1a1a2e;
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: white;
            }
        }

        .welcome-msg {
            small {
                color: #94a3b8;
                font-size: 0.75rem;
            }

            h2 {
                font-size: 1.1rem;
                margin: 0;
            }
        }
    }
}

// O Cartão de Saldo
.wallet-card {
    background: color.$card-bg;
    border-radius: 30px;
    padding: 25px;
    color: white;
    position: relative;
    overflow: hidden;
    max-width: 400px;
    width: 95%;
    margin: 0 auto;
    animation: neonCard 6s infinite alternate;

    @keyframes neonCard {
        0% {
            box-shadow: 0 0 15px -10px color.$accent-glow;
        }

        100% {
            box-shadow: 0 0 30px -10px color.$accent-glow;
        }
    }

    .card-head {
        display: flex;
        justify-content: space-between;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.85rem;
        margin-bottom: 10px;

        .blur-toggle {
            background: none;
            border: none;
            cursor: pointer;
        }
    }

    .main-balance {
        font-size: 2.5rem;
        font-weight: 800;
        margin: 0 0 25px 0;
        transition: filter 0.3s;

        &.is-blurred {
            filter: blur(8px);
        }
    }

    .card-footer {
        display: flex;
        gap: 30px;

        .mini-stat {
            .label {
                display: block;
                font-size: 0.7rem;
                color: rgba(255, 255, 255, 0.6);
            }

            .val {
                font-weight: 600;
                font-size: 0.9rem;
            }

            .positive {
                color: #4ade80;
            }

            .negative {
                color: #f87171;
            }
        }
    }
}

.aura-brain-section {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}

// Barra de Insights
.pills-scroll {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 10px 0;

    &::-webkit-scrollbar {
        display: none;
    }

    .pill-item {
        padding: 10px 18px;
        border-radius: 50px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #94a3b8;
        white-space: nowrap;
        font-size: 0.85rem;
        transition: 0.3s;

        &.active {
            background: white;
            color: black;
            font-weight: 600;
        }
    }
}

// Card de Insight Individual
.insight-card-modern {
    @include mxs.glass;
    border-radius: 24px;
    padding: 20px;
    min-height: 120px;

    .insight-content {
        display: flex;
        gap: 15px;
        align-items: center;

        .icon-circle {
            width: 50px;
            height: 50px;
            border-radius: 15px;
            background: rgba(color.$accent, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }

        .fire {
            color: rgb(255, 243, 15);
            filter: drop-shadow(0 0 10px rgb(255, 243, 15));
        }

        .text-data {
            flex: 1;

            p {
                margin: 0 0 8px 0;
                font-size: 0.9rem;
                color: #e2e8f0;
            }

            .progress-bar-container {
                height: 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                overflow: hidden;

                .progress-fill {
                    height: 100%;
                    background: color.$accent;
                    border-radius: 10px;
                }
            }

            small {
                color: #64748b;
                font-size: 0.75rem;
                margin-top: 5px;
                display: block;
            }
        }
    }
}

// Bottom Nav: O toque final de app real
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 85px;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(20px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);

    .nav-item {
        background: none;
        border: none;
        color: #64748b;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-size: 1.2rem;

        span {
            font-size: 0.65rem;
            font-weight: 500;
        }

        &.active {
            color: color.$accent;
        }
    }

    .add-btn-wrapper {
        position: relative;
        top: -25px;

        .add-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: color.$accent;
            border: 5px solid #0f172a;
            color: white;
            font-size: 2rem;
            font-weight: 300;
            box-shadow: 0 10px 20px rgba(color.$accent, 0.4);
        }
    }
}
</style>