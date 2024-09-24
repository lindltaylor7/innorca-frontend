<template>
    <div class="modal-form">
        <h5 class="modal-title">Solicitud de Minuta</h5>
        <p class="mb-0">Seleccione el titular</p>
        <div class="row">
            <template v-for="customer in customers">
                <ButtonWizard :title="customer.name" :img="require('~/assets/img/user-male.png')"
                    :value="userSelected" />
            </template>
        </div>
        <p>Seleccione su Estado</p>
        <div class="section-buttons w-100">
            <button class="btn btn-secondary m-2" :class="`${option.selected ? 'selected' : ''}`"
                v-for="option in options" @click="pickedButton(option)">{{ option.name
                }}</button>
        </div>

        <hr>
        <button class="btn btn-green float-left mt-2" @click="handleNextButton">Seleccionar</button>
    </div>
</template>
<script>
import ButtonWizard from "./ButtonWizard.vue"

export default {
    components: { ButtonWizard },
    data() {
        return {
            customers: [{ id: 1, name: "Juan Perez" }, { id: 2, name: "Roberta Carla" }],
            userSelected: 0,
            options: [
                {
                    id: 0,
                    name: "Soltero",
                    selected: false
                },
                {
                    id: 0,
                    name: "Casado",
                    selected: false
                },
                {
                    id: 1,
                    name: "Divorciado",
                    selected: false
                },
                {
                    id: 2,
                    name: 'Domiciliado en provincia o extranjero',
                    selected: false
                },
                {
                    id: 3,
                    name: 'Copropietario fallecido',
                    selected: false
                },
                {
                    id: 4,
                    name: 'Persona jurídica',
                    selected: false
                },
            ]
        }
    },
    methods: {
        handleNextButton() {
            this.$emit('nextModal', 5);
        },
        pickedButton(option) {

            this.options.forEach(option => {
                option.selected = false;
            });

            option.selected = true;
        }
    }
}
</script>
<style scoped>
.btn-secondary {
    border-radius: 5px !important;
}

.selected {
    background-color: orange !important;
    border: 1px solid orange;
}
</style>