<template>
	<div class="modal-form">
		<h5 class="modal-title">Nueva solicitud de Trámite</h5>
		<template>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
			</p>

			<div class="row">
				<div class="col-6">
					<div class="mb-1">
						<select
							name="categoryAttention"
							id="categoryAttention"
							v-model="newRequestDocument.categoryAttention">
							<option value="1">Trámite de minuta</option>
						</select>
						<label for="categoryAttention" placeholder="Categoría de Atención"></label>
					</div>
					<div class="mb-1">
						<select name="nameProject" id="nameProject" v-model="newRequestDocument.nameProject">
							<option value="Praderas del Olivar">Praderas del Olivar</option>
						</select>
						<label for="categoryAttention" placeholder="Nombre del Proyecto"></label>
					</div>
					<div class="mb-1">
						<input type="text" name="email" id="email" v-model="newRequestDocument.email" />
						<label for="email" placeholder="Correo Electrónico"></label>
					</div>
				</div>
				<div class="col-6">
					<div class="mb-1">
						<select name="contractNumber" id="contractNumber" v-model="newRequestDocument.contractNumber">
							<option value="460175">460175</option>
						</select>
						<label for="categoryAttention" placeholder="Número de Contrato / Ubicación"></label>
					</div>
					<div class="mb-1">
						<input type="text" name="cellphone" id="cellphone" v-model="newRequestDocument.cellphone" />
						<label for="cellphone" placeholder="Celular"></label>
					</div>
				</div>
			</div>

			<button type="button" class="btn btn-green float-left mt-2" @click="handleNextButton">Validación</button>
		</template>
		<Loader
			v-if="showLoader"
			:title="'!Felicitaciones!'"
			:subtitle="'Ya puedes iniciar tu trámite de minuta'"
			@nextModal="nextModal" />
	</div>
</template>
<script>
	import Loader from './Loader.vue';

	export default {
		components: { Loader },
		data() {
			return {
				newRequestDocument: {
					categoryAttention: 0,
					nameProject: '',
					email: '',
					contractNumber: '',
					cellphone: '',
				},
				showLoader: false,
			};
		},
		methods: {
			handleNextButton() {
				//this.$emit('nextModal', 2);
				this.showLoader = true;
			},
			nextModal() {
				this.showLoader = false;
				this.$emit('nextModal', 4);
			},
		},
	};
</script>
<style lang=""></style>
