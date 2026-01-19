<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { authService } from '../../services/authService';
import { releasesService } from '../../services/releasesService';
import { useRouter } from 'vue-router';
import { formatarMoeda } from '../../utils/formatters';
import BaseScreen from '../common/BaseScreen.vue'

const router = useRouter();
const listaLancamentos = ref<any[]>([]);
const carregando = ref(true);
const filtroTipo = ref('todos');

// Mesma lógica de meses da Dashboard (pode ser centralizada depois)
const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const mesSelecionado = ref(meses[new Date().getMonth()]);

const carregarExtrato = async () => {
    carregando.value = true;
    try {
        const user = await authService.getUsuarioLogado();

        if (!user) {
            router.push('/'); // Redireciona se perder a sessão
            return;
        }

        // Agora temos o user.id para buscar os lançamentos
        listaLancamentos.value = await releasesService.buscarPorMes(user.id, mesSelecionado.value);
    } catch (error) {
        console.error("Erro ao carregar extrato:", error);
    } finally {
        carregando.value = false;
    }
};

const listaFiltrada = computed(() => {
    if (filtroTipo.value === 'todos') return listaLancamentos.value;
    return listaLancamentos.value.filter(i => i.tipo === filtroTipo.value);
});

const getEmoji = (categoria: string) => {
    const cat = categoria?.toLowerCase() || '';
    if (cat.includes('alimentação')) return '🍕';
    if (cat.includes('transporte')) return '🚗';
    if (cat.includes('lazer')) return '🎡';
    return '📊';
};

onMounted(carregarExtrato);
watch(mesSelecionado, carregarExtrato);
</script>

<template>
    <BaseScreen>
        <div class="extract-page">
            <header class="page-header">
                <button @click="$router.back()" class="btn-back">←</button>
                <div class="header-titles">
                    <h1>Extrato</h1>
                    <select v-model="mesSelecionado" @change="carregarExtrato" class="select-month">
                        <option v-for="m in meses" :key="m" :value="m">{{ m }}</option>
                    </select>
                </div>
            </header>

            <div class="filter-bar">
                <button v-for="f in ['todos', 'gasto', 'renda']" :key="f" @click="filtroTipo = f"
                    :class="['filter-pill', { active: filtroTipo === f }]">
                    {{ f === 'todos' ? 'Tudo' : f === 'gasto' ? 'Saídas' : 'Entradas' }}
                </button>
            </div>

            <div class="transactions-container">
                <div v-if="carregando" class="loading-state">
                    <p>Buscando transações...</p>
                </div>

                <div v-else-if="listaFiltrada.length > 0" class="transaction-list">
                    <div v-for="item in listaFiltrada" :key="item.id" class="transaction-item">
                        <div class="item-icon" :class="item.tipo">
                            {{ getEmoji(item.categoria) }}
                        </div>
                        <div class="item-main">
                            <span class="item-desc">{{ item.descricao || item.categoria }}</span>
                            <span class="item-sub">{{ item.data }} • {{ item.pagamento }}</span>
                        </div>
                        <div class="item-end">
                            <span :class="['item-value', item.tipo]">
                                {{ item.tipo === 'gasto' ? '-' : '+' }} {{ formatarMoeda(item.valor) }}
                            </span>
                            <span class="item-user">{{ item.responsavel }}</span>
                        </div>
                    </div>
                </div>

                <div v-else class="empty-state">
                    <p>Nenhum registro encontrado.</p>
                </div>
            </div>
        </div>
    </BaseScreen>
</template>

<style lang="scss" scoped>
.extract-page {
    padding-bottom: 20px;

    .page-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 25px;

        .btn-back {
            background: rgba(255, 255, 255, 0.05);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            font-size: 1.2rem;
        }

        .header-titles {
            h1 {
                font-size: 1.5rem;
                margin: 0;
            }

            .select-month {
                background: none;
                border: none;
                color: #94a3b8;
                font-size: 0.9rem;
                padding: 0;
                cursor: pointer;
            }
        }
    }

    .filter-bar {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;

        .filter-pill {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #64748b;
            padding: 8px 16px;
            border-radius: 50px;
            font-size: 0.85rem;
            transition: all 0.3s ease;

            &.active {
                background: white;
                color: black;
                border-color: white;
            }
        }
    }

    .transaction-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.03);

        .item-icon {
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;

            &.renda {
                background: rgba(16, 185, 129, 0.1);
            }
        }

        .item-main {
            flex: 1;
            display: flex;
            flex-direction: column;

            .item-desc {
                font-weight: 500;
                font-size: 0.95rem;
                color: #f1f5f9;
            }

            .item-sub {
                font-size: 0.75rem;
                color: #64748b;
                margin-top: 2px;
            }
        }

        .item-end {
            text-align: right;

            .item-value {
                display: block;
                font-weight: 600;
                font-size: 0.95rem;

                &.gasto {
                    color: #f87171;
                }

                &.renda {
                    color: #4ade80;
                }
            }

            .item-user {
                font-size: 0.65rem;
                color: #475569;
                text-transform: uppercase;
            }
        }
    }
}
</style>