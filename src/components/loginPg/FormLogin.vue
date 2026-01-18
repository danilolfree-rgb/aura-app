<template>
    <div class="container-login">
        <div class="login-card" data-aos="zoom-in">
            <div class="logo">AURA</div>

            <h5>{{ isLoginMode ? 'Bem-vindo de volta' : 'Crie sua conta' }}</h5>

            <div class="form-group">
                <label class="form-label">E-mail</label>
                <input v-model="credentials.email" type="email" class="form-control" placeholder="seu@email.com">
            </div>

            <div class="form-group">
                <label class="form-label">Senha</label>
                <input v-model="credentials.password" type="password" class="form-control" placeholder="••••••••">
            </div>

            <button class="btn-login" @click="handleLogin">
                {{ isLoginMode ? 'Entrar' : 'Cadastrar' }}
            </button>

            <div class="switch-auth" @click="toggleAuth">
                <span>{{ isLoginMode ? 'Não tem uma conta?' : 'Já possui conta?' }}</span>
                <span class="toggle-text">
                    {{ isLoginMode ? 'Cadastre-se' : 'Fazer Login' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, reactive } from 'vue';
import { authService } from '../../services/authService.ts';
import { useRouter } from 'vue-router'

const router = useRouter();
const loading = ref(false);

const credentials = reactive({
    email: '',
    password: ''
});

const isLoginMode = ref(true);

const { openModal } = inject('modalActions');

async function handleLogin() {
    if (isLoginMode.value) {
        if (!credentials.email || !credentials.password) return alert('Preencha tudo!');

        try {
            loading.value = true;
            await authService.login(credentials.email, credentials.password);

            // Se logou, manda para a Dashboard
            router.push('/dashboard');
            alert('Logado com sucesso')
        } catch (error) {
            alert('Erro detalhado: ' + error.message);
            credentials.email = ''
            credentials.password = ''
        } finally {
            loading.value = false;
        }
    } else {
        openModal('register');
    }
}

function toggleAuth() {
    isLoginMode.value = !isLoginMode.value;
}

</script>

<style lang="scss" scoped>
@use '../../assets/mixins' as mxs;
@use '../../assets/colors' as color;

.container-login {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .login-card {
        max-width: 400px;
        height: auto;
        @include mxs.glass;
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        border-radius: 32px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        text-align: center;

        .switch-auth {
            font-size: 0.9rem;
            color: #64748b;

            #toggleText {
                color: color.$accent;
                text-decoration: none;
                transition: 0.3s;
                padding: 5px;
                font-weight: 600;
            }

            &:hover {
                color: white;
                text-shadow: 0 0 10px color.$accent;
            }
        }
    }
}
</style>