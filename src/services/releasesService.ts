import { client } from '../../lib/config';

// Interface para tipar seus dados (ajuste conforme suas colunas)
export interface Lancamento {
    id?: string;
    valor: number;
    tipo: 'renda' | 'gasto';
    mes: string;
    user_id: string;
    categoria?: string;
    descricao?: string;
    pagamento: 'Pix' | 'Boleto' | 'Crédito' | 'Debito';
    responsavel: string;
}

export const releasesService = {
    // Busca lançamentos por usuário e mês
    async buscarPorMes(userId: string, mes: string) {
        const { data, error } = await client
            .from('Lançamentos') // Certifique-se que o nome no banco é este
            .select('*')
            .eq('user_id', userId)
            .eq('mes', mes);

        if (error) throw error;
        return data as Lancamento[];
    },

    // Exemplo: Função para adicionar (que você pode usar depois)
    async adicionar(dados: Lancamento) {
        const { data, error } = await client
            .from('lancamentos')
            .insert([dados]);

        if (error) throw error;
        return data;
    }
};