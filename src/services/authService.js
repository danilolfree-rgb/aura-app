import { client } from "../../lib/config";

export const authService = {
    // Função de Login
    async login(email, password) {
        const { data, error } = await client.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    async getSession() {
        const { data: { session } } = await client.auth.getSession();
        if (!session) return null;

        const meta = session.user.user_metadata || {};
        const isCasal = meta.tipo_uso === 'casal';

        return {
            session,
            user: {
                displayName: meta.display_name,
                parceiroNome: meta.parceiro_nome,
                genero: meta.genero,
                isCasal,
                saudacao: isCasal && meta.parceiro_nome
                    ? `Bem-vindos, ${meta.display_name} & ${meta.parceiro_nome}! ❤️`
                    : `${meta.genero === 'f' ? 'Bem-vinda' : 'Bem-vindo'}, ${meta.display_name}!`
            }
        };
    },

    async logout() {
        await s_client.auth.signOut();
    }
};