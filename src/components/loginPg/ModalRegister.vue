<template>
    <div class="logo">AURA</div>
    <h4>Configure seu Perfil</h4>
    <p class="subtitle">Como você deseja utilizar a plataforma?</p>

    <div class="modal-body-form">
        <label class="form-label">Modo de Uso</label>
        <select v-model="mode" id="tipoUso" class="form-control mb-3" onchange="toggleCamposCasal()">
            <option value="alone">Individual (Só eu)</option>
            <option value="couple">Em Casal (Nós dois)</option>
        </select>

        <div class="modal-grid">
            <div>
                <label class="form-label">Seu Nome</label>
                <input type="text" id="nomeUser" class="form-control" placeholder="Ex: Lucas">
            </div>
            <div>
                <label class="form-label label-caps">Gênero</label>
                <select id="generoUser" class="form-control">
                    <option value="m">Masc.</option>
                    <option value="f">Fem.</option>
                </select>
            </div>
        </div>

        <div v-if="mode === 'couple'" id="sessaoCasal" class="sessao-casal">
            <div class="modal-grid">
                <div>
                    <label class="form-label">Parceiro (a)</label>
                    <input type="text" id="nomeParceiro" class="form-control" placeholder="Ex: Ana">
                </div>
                <div>
                    <label class="form-label">Gênero</label>
                    <select id="generoParceiro" class="form-control">
                        <option value="f">Fem.</option>
                        <option value="m">Masc.</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <button class="btn-login" onclick="finishRegister()">FINALIZAR</button>

</template>

<script setup>
import { ref } from 'vue';
const mode = ref('alone');
</script>

<style lang="scss" scoped>
.modal-body-form {
    display: flex;
    flex-direction: column;
    width: 100%;

    .modal-grid {
        display: grid;
        grid-template-columns: 7fr 5fr;
        gap: 12px;
        text-align: left;
        margin-bottom: 15px;
    }

    .sessao-casal {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
}

.modal-footer-grid {
    display: flex;
    justify-content: space-between;
}

.btn-back {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #64748b;
    width: 50%;
    border-radius: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }
}
</style>