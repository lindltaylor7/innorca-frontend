<template>
    <div class="modal-form">
        <h5 class="modal-title">Nueva solicitud de Trámite</h5>
        <template>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>

            <div class="row">
                <div class="col-6">
                    <select name="categoryAttention" id="categoryAttention" v-model="categoryAttention">
                        <option value="1">Trámite de minuta</option>
                    </select>
                    <label for="categoryAttention" placeholder="Categoría de Atención"></label>
                    <select name="nameProject" id="nameProject" v-model="nameProject">
                        <option value="Praderas del Olivar">Praderas del Olivar</option>
                    </select>
                    <label for="categoryAttention" placeholder="Nombre del Proyecto"></label>
                    <input type="text" name="email" id="email" v-model="email" placeholder="Correo electrónico">
                </div>
                <div class="col-6">
                    <select name="contractNumber" id="contractNumber" v-model="contractNumber">
                        <option value="460175">460175</option>
                    </select>
                    <label for="categoryAttention" placeholder="Número de Contrato / Ubicación"></label>
                    <input type="text" name="cellphone" id="cellphone" v-model="cellphone" placeholder="Celular">
                </div>
            </div>

            <button type="button" class="btn btn-green float-left mt-2" @click="handleNextButton">
                Validación
            </button>
        </template>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newRequestDocument: {
                categoryAttention: 0,
                nameProject: '',
                email: '',
                contractNumber: '',
                cellphone: ''
            }
        }
    },
    methods: {
        handleNextButton() {

        }
    }
}
</script>
<style lang="">

</style>