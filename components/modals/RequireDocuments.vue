<template>
    <div class="modal-form">
        <h5 class="modal-title">Solicitud de Minuta</h5>
        <p>Documentos Requeridos</p>
        <div class="row align-items-center">
            <ButtonWizard :title="'DNI'" :value="1"></ButtonWizard>
            <ButtonWizard :title="'Carnet de Extranjero'" :value="2"></ButtonWizard>
            <ButtonWizard :title="'Permiso especial para firmar contratos (PEFC)'" :value="3"></ButtonWizard>
        </div>
        <div class="required-files">
            {{ documentType }}
            <template>
                <input type="file" class="form-control">
                <input type="file" class="form-control">
            </template>

        </div>
        <hr>
        <button class="btn btn-warning">Guardar</button>
        <button class="btn btn-green">Enviar Solicitud</button>
    </div>
</template>
<script>
import ButtonWizard from './ButtonWizard.vue'

export default {
    components: { ButtonWizard },
    data() {
        return {
            documentType: 0
        }
    }
}
</script>
<style lang="">

</style>