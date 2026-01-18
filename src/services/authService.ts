import { client } from '../../lib/config';

export const authService = {
    // Adicionamos a tipagem ': string' para os dois parâmetros
    async login(email: string, password: string) {
        const { data, error } = await client.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    },

    async getUsuarioLogado() {
        const { data: { user }, error } = await client.auth.getUser();

        if (error || !user) return null;

        return {
            id: user.id,
            primeiroNome: (user.user_metadata?.display_name || 'Usuário').split(' ')[0],
            email: user.email
        };
    },

    async logout() {
        await client.auth.signOut();
    }
};