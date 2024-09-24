<template>
	<div class="modal-form">
		<h5 class="modal-title">Solicitud de Minuta</h5>
		<p @click="back">atrás</p>
		<div class="d-flex justify-content-between" v-if="statusClient < 3">
			<p>Documentos Requeridos</p>
			<p @click="back">atrás</p>
		</div>

		<div class="row align-items-center w-100" v-if="statusClient < 3">
			<div class="col-4">
				<ButtonWizard
					:img="require('~/assets/img/modals/dni.png')"
					:title="'DNI'"
					:value="1"
					@handleOptionSelected="handleOptionSelected"></ButtonWizard>
			</div>
			<div class="col-4">
				<ButtonWizard
					:img="require('~/assets/img/modals/carnet.png')"
					:title="'Carnet de Extranjero'"
					:value="2"
					@handleOptionSelected="handleOptionSelected"></ButtonWizard>
			</div>
			<div class="col-4">
				<ButtonWizard
					:img="require('~/assets/img/modals/permiso.png')"
					:title="'Permiso especial para firmar contratos (PEFC)'"
					:value="3"
					@handleOptionSelected="handleOptionSelected"></ButtonWizard>
			</div>
		</div>
		<div class="required-files">
			<template v-if="documentType == 1">
				<div class="row mt-5">
					<div class="col-4 upload-file" @click="openFileWindow(1)">
						<img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt="" />
						<p>Subir imagen delantera de DNI</p>
						<input
							type="file"
							class="form-control"
							ref="dniFront"
							accept="image/png, image/gif, image/jpeg" />
					</div>
					<div class="col-4 upload-file mx-2" @click="openFileWindow(2)">
						<img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2 mb-3" alt="" />
						<p>Subir imagen reversa de DNI</p>
						<input
							type="file"
							class="form-control"
							ref="dniBack"
							accept="image/png, image/gif, image/jpeg" />
					</div>
				</div>
			</template>
			<template v-else-if="documentType == 2">
				<div class="row mt-5">
					<div class="col upload-file">
						<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
						<p>Sube tu carnet de extranjería</p>
					</div>
				</div>
			</template>
			<template v-else-if="documentType == 3">
				<div class="row mt-5">
					<div class="col upload-file">
						<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
						<p>Permiso especial para firmar contratos (PEFC)</p>
					</div>
				</div>
			</template>
		</div>
		<div v-if="statusClient == 1">
			<h6 class="mt-5">Acta de Matrimonio</h6>
			<p>
				Copia de acta de matrimonio debidamente certificado por RENIEC. No mayor a 3 meses
				<a href="">Más información</a>
			</p>
			<div class="row">
				<div class="col upload-file">
					<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
					<p>Sube tu acta de matrimonio</p>
				</div>
			</div>
			<h6 class="mt-5">Régimen patrimonial de separación de patrimonio (Opcional)</h6>
			<p>
				Copia literal de la partida donde se encuentra inscrita con una vigencia no mayor a 3 meses emitido por
				SUNARP
				<a href="">Más información</a>
			</p>
			<div class="row">
				<div class="col upload-file">
					<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
					<p>Sube tu régimen patrimonial de seperación de patrimonio</p>
				</div>
			</div>
			<h6 class="mt-5">Documento de identificación de cónyuge</h6>
			<div class="row">
				<div class="col-5 upload-file" @click="openFileWindow(1)">
					<img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt="" />
					<p>Subir imagen delantera de DNI</p>
					<input type="file" class="form-control" ref="dniFront" accept="image/png, image/gif, image/jpeg" />
				</div>
				<div class="col-5 upload-file mx-2" @click="openFileWindow(2)">
					<img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2 mb-3" alt="" />
					<p>Subir imagen reversa de DNI</p>
					<input type="file" class="form-control" ref="dniBack" accept="image/png, image/gif, image/jpeg" />
				</div>
			</div>
		</div>
		<div v-if="statusClient == 2">
			<h6 class="mt-5">Inscripción de Divorcio</h6>
			<p>
				Copia literal de la partida donde se encuentra la inscripción de divorcio e registros públicos
				<a href="">Más información</a>
			</p>
			<div class="row">
				<div class="col upload-file">
					<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
					<p>Sube tu régimen patrimonial de seperación de patrimonio</p>
				</div>
			</div>
			<h6 class="mt-5">Tipo de divorcio</h6>
			<div class="row">
				<div class="col-6">
					<ButtonWizard :title="'Inscripción de divorcio en registros públicos '" :value="1"></ButtonWizard>
				</div>
				<div class="col-6">
					<ButtonWizard :title="'Divorcio en vía judicial'" :value="2"></ButtonWizard>
				</div>
			</div>
			<p>
				Copia literal de la partida donde se encuentra la inscripción de divorcio e registros públicos
				<a href="">Más información</a>
			</p>
			<div class="row">
				<div class="col upload-file">
					<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
					<p>Sube tu régimen patrimonial de seperación de patrimonio</p>
				</div>
			</div>
		</div>
		<div v-if="statusClient == 3">
			<h6 class="mt-5">Vigencia de Poder</h6>
			<p>
				Certificado de vigencia de poder con una antiguedad no menor a 03 meses
				<a href="">Más información</a>
			</p>
			<div class="row">
				<div class="col upload-file">
					<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
					<p>Sube tu vigenica de poder</p>
				</div>
			</div>
			<h6 class="mt-5">Documento de identidad del apoderado</h6>
			<div class="row">
				<div class="col-5 upload-file" @click="openFileWindow(1)">
					<img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt="" />
					<p>Subir imagen delantera de DNI</p>
					<input type="file" class="form-control" ref="dniFront" accept="image/png, image/gif, image/jpeg" />
				</div>
				<div class="col-5 upload-file mx-2" @click="openFileWindow(2)">
					<img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2 mb-3" alt="" />
					<p>Subir imagen reversa de DNI</p>
					<input type="file" class="form-control" ref="dniBack" accept="image/png, image/gif, image/jpeg" />
				</div>
			</div>
		</div>
		<div v-if="statusClient == 4">
			<h6 class="mt-5">Sucesión intestada o testamento</h6>
			<p>
				Copia literal de sucesión intestada o testamento inscrito en registros públicos (SUNARP).
				<a href="">Más información</a>
			</p>
			<div class="row">
				<div class="col upload-file">
					<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
					<p>Adjunta el archivo</p>
				</div>
			</div>
			<h6 class="mt-5">Documento de identidad de los apoderados</h6>
			<select name="nameProject" id="nameProject" class="w-50">
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<label for="categoryAttention" placeholder="Cantidad de Herederos"></label>
			<template>
				<div class="heir-dni w-100">
					<p class="mb-0 important">Heredero</p>
					<img src="~/assets/img/modals/dnianverso.png" />
					<a href="">DNI imagen delantera</a>
					<img src="~/assets/img/modals/dnireverso.png" />
					<a href="">DNI imagen reversa</a>
					<input type="radio" name="" id="" />
				</div>
			</template>
		</div>
		<div v-if="statusClient == 5">
			<h6 class="mt-5">Documento de identidad de representante legal</h6>
			<div class="row">
				<div class="col-5 upload-file" @click="openFileWindow(1)">
					<img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt="" />
					<p>Subir imagen delantera de DNI</p>
					<input type="file" class="form-control" ref="dniFront" accept="image/png, image/gif, image/jpeg" />
				</div>
				<div class="col-5 upload-file mx-2" @click="openFileWindow(2)">
					<img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2 mb-3" alt="" />
					<p>Subir imagen reversa de DNI</p>
					<input type="file" class="form-control" ref="dniBack" accept="image/png, image/gif, image/jpeg" />
				</div>
			</div>
			<h6 class="mt-5">Vigencia de Poder</h6>
			<p>
				Certificado de vigencia de poder del representante legal con una vigencia no mayor a 03 meses emitido
				por registros públicos (SUNARP).
				<a href="">Más información</a>
			</p>
			<div class="row">
				<div class="col upload-file">
					<img src="~/assets/img/modals/subir.png" class="w-25" alt="" />
					<p>Sube tu vigenica de poder</p>
				</div>
			</div>
		</div>
		<Loader v-if="showLoader" @nextModal="nextModal" />
		<hr />
		<button class="btn btn-warning">Guardar</button>
		<button class="btn btn-green" @click="loader">Enviar Solicitud</button>
	</div>
</template>
<script>
	import ButtonWizard from './ButtonWizard.vue';
	import Loader from './Loader.vue';

	export default {
		components: { ButtonWizard, Loader },
		data() {
			return {
				documentType: null,
				showLoader: false,
			};
		},
		props: {
			statusClient: Number,
		},
		methods: {
			handleOptionSelected(value) {
				console.log(value);
				this.documentType = value;
			},
			openFileWindow(val) {
				if (val == 1) {
					this.$refs.dniFront.click();
				} else {
					this.$refs.dniBack.click();
				}
			},
			back() {
				this.$emit('backModal', 4);
			},
			loader() {
				this.$emit('nextModal', 5);
				this.showLoader = true;
			},
			nextModal() {
				this.showLoader = false;
				this.$emit('nextModal', 6);
			},
		},
	};
</script>
<style scoped>
	.upload-file {
		border: 1px dashed #bebebe;
		border-radius: 20px;
		color: #bebebe;
		font-size: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
	}
	.heir-dni {
		border: 1px solid green;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 10px;
	}

	.heir-dni img {
		width: 100px;
	}

	input[type='radio'] {
		width: 20px;
		height: 20px;
		margin: 5px 3px 0px 0px;
		accent-color: green;
	}
</style>
