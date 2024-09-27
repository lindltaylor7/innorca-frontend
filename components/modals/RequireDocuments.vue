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
				<ButtonWizard :img="require('~/assets/img/modals/dni.png')" :title="'DNI'" :value="1"
					@handleOptionSelected="handleOptionSelected"></ButtonWizard>
			</div>
			<div class="col-4">
				<ButtonWizard :img="require('~/assets/img/modals/carnet.png')" :title="'Carnet de Extranjero'"
					:value="2" @handleOptionSelected="handleOptionSelected"></ButtonWizard>
			</div>
			<div class="col-4">
				<ButtonWizard :img="require('~/assets/img/modals/permiso.png')"
					:title="'Permiso especial para firmar contratos (PEFC)'" :value="3"
					@handleOptionSelected="handleOptionSelected"></ButtonWizard>
			</div>
		</div>
		<div class="required-files">
			<template v-if="documentType == 1">
				<div class="row mt-5">
					<div class="col-4 upload-file" @click="openFileWindow(1)">
						<img src="~/assets/img/modals/dnianverso.png" class="w-25 mt-2" alt="" />
						<p>Subir imagen delantera de DNI</p>
						<input type="file" class="form-control" ref="dniFront"
							accept="image/png, image/gif, image/jpeg" />
					</div>
					<div class="col-4 upload-file mx-2" @click="openFileWindow(2)">
						<img src="~/assets/img/modals/dnireverso.png" class="w-25 mt-2 mb-3" alt="" />
						<p>Subir imagen reversa de DNI</p>
						<input type="file" class="form-control" ref="dniBack"
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
		<component :is="getUserStatus"></component>
		<Loader v-if="showLoader" @nextModal="nextModal" :title="'!Validado!'" :subtitle="''" />
		<hr />
		<button class="btn btn-warning">Guardar</button>
		<button class="btn btn-green" @click="loader">Enviar Solicitud</button>
	</div>
</template>
<script>
import ButtonWizard from './ButtonWizard.vue';
import Loader from './Loader.vue';
import Married from './statusUser/Married.vue';
import Divorced from './statusUser/Divorced.vue';
import Foreign from './statusUser/Foreign.vue';
import Dead from './statusUser/Dead.vue';
import Legal from './statusUser/Legal.vue';

export default {
	components: { ButtonWizard, Loader, Married, Divorced, Foreign, Dead, Legal },
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
	computed: {
		getUserStatus() {
			switch (this.statusClient) {
				case 1:
					return 'Married';
				case 2:
					return 'Divorced';
				case 3:
					return 'Foreign';
				case 4:
					return 'Dead';
				case 5:
					return 'Legal';
				default:
					return '';
			}
		},
	}
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
