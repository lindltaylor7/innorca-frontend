<template>
    <b-modal id="modal_sac" centered class="modal fade" tabindex="-1" :hide-footer="hideFooterModal" aria-hidden="true">
        <div class="modal-form" v-if="activeForm">
            <h5 class="modal-title">Nuevo Trámite</h5>
            <template>
                <p class="welcome">
                    Por favor seleccione la el tipo de atención, categoría y proyecto sobre el cual desea realizar
                    su atención:
                </p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>

                <!-- Icon boxes -->
                <div class="request-options flex-row">
                    <ButtonWizard @handleOptionSelected="handleOptionSelect"
                        :img="'../assets/img/modals/solicitud_.png'" :title="'Solicitud'" :value="1" />
                    <ButtonWizard @handleOptionSelected="handleOptionSelect" :img="'../assets/img/modals/reclamo.png'"
                        :title="'Reclamo / Queja'" :value="2" />
                    <ButtonWizard @handleOptionSelected="handleOptionSelect" :img="'../assets/img/modals/consulta.png'"
                        :title="'Consulta'" :value="3" />
                </div>

                <!-- Next Button -->
                <button type="button" class="btn btn-green float-left mt-2" @click="handleNextButton">
                    Siguiente →
                </button>
            </template>
        </div>
        <div v-else="activeForm">
            <NewDocumentForm />
        </div>
    </b-modal>
</template>
<script>
import ButtonWizard from '../../components/modals/ButtonWizard.vue';
import NewDocumentForm from '../../components/modals/NewDocumentForm.vue';

export default {
    components: { ButtonWizard, NewDocumentForm },
    data() {
        return {
            selected: '',
            hideFooterModal: true,
            activeForm: true
        }
    },
    methods: {
        handleOptionSelect(value) {
            this.selected = value;
        },
        handleNextButton() {
            this.activeForm = false
        }
    }
}
</script>