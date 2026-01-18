<script setup lang="ts">
import BaseScreen from '../common/BaseScreen.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { formatarMoeda } from '../../utils/formatters';

import { authService } from '../../services/authService';
import { releasesService } from '../../services/releasesService'

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
        <header class="mobile-header">
            <div class="user-info">
                <span class="avatar">{{ nameUser[0].toUpperCase() }}</span>
                <div class="texts">
                    <p class="greeting">Olá, {{ nameUser }}</p>
                    <p class="status" :class="{ 'syncing': carregando }">
                        {{ carregando ? 'Sincronizando...' : 'Carteira atualizada' }}
                    </p>
                </div>
            </div>
            <div class="month-selector-wrapper">
                <select v-model="mesSelecionado" class="select-month-minimal">
                    <option v-for="mes in meses" :key="mes" :value="mes">{{ mes }}</option>
                </select>
            </div>
        </header>

        <div class="main-card-mobile" :class="{ 'loading': carregando }">
            <div class="balance-label">Balanço total disponível</div>
            <div class="balance-row">
                <span class="balance-value">{{ formatarMoeda(resumo.saldo) }}</span>
                <button @click="saldoVisivel = !saldoVisivel" class="btn-eye">
                    {{ saldoVisivel ? '👁️' : '🙈' }}
                </button>
            </div>

            <div class="stats-grid">
                <div class="stat-item up">
                    <div class="stat-icon">↑</div>
                    <div class="stat-data">
                        <small>Entradas</small>
                        <p>{{ saldoVisivel ? formatarMoeda(resumo.renda) : '••••' }}</p>
                    </div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item down">
                    <div class="stat-icon">↓</div>
                    <div class="stat-data">
                        <small>Saídas</small>
                        <p>{{ saldoVisivel ? formatarMoeda(resumo.gastos) : '••••' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <section class="mobile-insights">
            <div class="section-header">
                <h3>Análise Aura ✨</h3>
                <div class="tabs-pills">
                    <button v-for="t in ['categoria', 'pagamento', 'quem']" :key="t" @click="abaAtiva = t"
                        :class="['pill-btn', { active: abaAtiva === t }]">
                        {{ t }}
                    </button>
                </div>
            </div>

            <transition name="slide-up" mode="out-in">
                <div :key="abaAtiva" class="insight-card-mobile">
                    <div v-if="!carregando && estatisticasGerais" class="insight-inner">
                        <div class="badge-type">{{ abaAtiva }}</div>
                        <div v-if="abaAtiva === 'categoria'">
                            <p class="label">Maior gasto em {{ mesSelecionado }}</p>
                            <h4 class="value-title">{{ estatisticasGerais.maior.descricao ||
                                estatisticasGerais.maior.categoria }}</h4>
                            <span class="highlight-price">{{ formatarMoeda(estatisticasGerais.maior.valor) }}</span>
                        </div>
                    </div>
                    <div v-else class="skeleton-mobile"></div>
                </div>
            </transition>
        </section>
    </BaseScreen>
</template>

<style lang="scss" scoped>
@use '../../assets/colors' as color;
@use '../../assets/mixins' as mxs;

// Cabeçalho estilo iOS/Android
.mobile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 5px 25px;

    .user-info {
        display: flex;
        align-items: center;
        gap: 12px;

        .avatar {
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, color.$accent, #8b5cf6);
            border-radius: 14px; // Squircle style
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            color: white;
            box-shadow: 0 4px 12px rgba(color.$accent, 0.3);
        }

        .greeting {
            font-weight: 600;
            font-size: 1.1rem;
            margin: 0;
        }

        .status {
            font-size: 0.75rem;
            color: #94a3b8;
            margin: 0;
        }
    }
}

// Card Principal Mobile
.main-card-mobile {
    @include mxs.glass;
    border-radius: 28px;
    padding: 24px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    margin-bottom: 30px;

    .balance-label {
        color: #94a3b8;
        font-size: 0.85rem;
        margin-bottom: 8px;
    }

    .balance-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;

        .balance-value {
            font-size: 2.2rem;
            font-weight: 700;
            letter-spacing: -1px;
        }

        .btn-eye {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
        }
    }
}

// Grid de Ganhos/Gastos
.stats-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    padding: 15px;

    .stat-item {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;

        .stat-icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        &.up .stat-icon {
            background: rgba(16, 185, 129, 0.2);
            color: #10b981;
        }

        &.down .stat-icon {
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
        }

        small {
            color: #94a3b8;
            font-size: 0.7rem;
            display: block;
        }

        p {
            font-weight: 600;
            font-size: 0.95rem;
            margin: 0;
        }
    }

    .stat-divider {
        width: 1px;
        height: 30px;
        background: rgba(255, 255, 255, 0.1);
        margin: 0 15px;
    }
}

// Tabs em estilo Pill (Pílula)
.tabs-pills {
    display: flex;
    gap: 8px;
    margin: 15px 0;
    overflow-x: auto;
    padding-bottom: 5px;

    .pill-btn {
        padding: 8px 20px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        color: #94a3b8;
        white-space: nowrap;
        font-size: 0.85rem;
        transition: all 0.3s ease;

        &.active {
            background: color.$accent;
            color: white;
            border-color: color.$accent;
            box-shadow: 0 4px 12px rgba(color.$accent, 0.4);
        }
    }
}

// Transição suave (Slide)
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>